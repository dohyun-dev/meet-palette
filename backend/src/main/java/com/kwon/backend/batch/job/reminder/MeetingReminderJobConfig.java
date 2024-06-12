package com.kwon.backend.batch.job.reminder;

import com.kwon.backend.common.util.sms.CoolSmsService;
import com.kwon.backend.common.util.sms.SmsText;
import com.kwon.backend.meeting.adaptor.out.persistence.entity.MeetingReminderEntity;
import com.kwon.backend.meeting.domain.Meeting;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;

import java.time.LocalDateTime;
import java.util.Map;

import static com.kwon.backend.batch.job.reminder.MeetingReminderJobConfig.Constant.CHUNK_SIZE;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class MeetingReminderJobConfig {

    private final CoolSmsService coolSmsService;
    private final JobRepository jobRepository;
    private final JpaTransactionManager transactionManager;
    private final EntityManagerFactory entityManagerFactory;
    private final ModelMapper mapper;
    @Value("${frontEndUrl.placeConfirm}")
    private String PLACE_CONFIRM_URL;


    // Job 구성
    @Bean
    public Job meetingReminderJob() {
        return new JobBuilder(Constant.JOB_NAME, jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(meetingReminderStep()) // 첫 번째 스텝 설정
                .build();
    }

    // Step 구성
    @Bean
    @JobScope
    public Step meetingReminderStep() {
        return new StepBuilder(Constant.STEP_NAME, jobRepository)
                .<MeetingReminderEntity, MeetingReminderEntity>chunk(CHUNK_SIZE, transactionManager) // 청크 사이즈 및 트랜잭션 매니저 설정
                .reader(itemReader(null)) // 아이템 리더 설정
                .processor(itemProcessor()) // 아이템 프로세서 설정
                .writer(itemWriter()) // 아이템 라이터 설정
                .build();
    }

    // 아이템 리더
    @Bean
    @StepScope
    public JpaPagingItemReader<MeetingReminderEntity> itemReader(
            @Value("#{jobParameters[reminderDateTime]}") LocalDateTime reminderDateTime
    ) {
        return new JpaPagingItemReaderBuilder<MeetingReminderEntity>()
                .name(Constant.ITEM_READER_NAME)
                .entityManagerFactory(entityManagerFactory)
                .pageSize(Constant.CHUNK_SIZE)
                .queryString(Constant.JPA_QUERY)
                .parameterValues(Map.of(Constant.JPA_QUERY_PARAM, reminderDateTime))
                .build();
    }

    // 아이템 프로세서
    @Bean
    @StepScope
    public ItemProcessor<MeetingReminderEntity, MeetingReminderEntity> itemProcessor() {
        return meetingReminder -> {
            // SMS 전송
            coolSmsService.sendSms(
                    meetingReminder.getPhoneNumber(),
                    Constant.messageType.getSubject(),
                    SmsText.createMessage(
                            Constant.messageType,
                            mapper.map(meetingReminder.getMeeting(), Meeting.class),
                            PLACE_CONFIRM_URL
                    )
            );

            // 알림 발송 처리
            meetingReminder.completeProcessing();

            return meetingReminder;
        };
    }

    // 아이템 라이터
    @Bean
    @StepScope
    public ItemWriter<MeetingReminderEntity> itemWriter() {
        JpaItemWriter<MeetingReminderEntity> jpaItemWriter = new JpaItemWriter<>();
        jpaItemWriter.setEntityManagerFactory(entityManagerFactory);
        return jpaItemWriter;
    }

    public static class Constant {
        public static final String JOB_NAME = "meetingReminderJob";
        public static final String STEP_NAME = "meetingReminderStep";
        public static final String ITEM_READER_NAME = "meetingReminderItemReader";
        public static final int CHUNK_SIZE = 10; // 청크 사이즈 정의

        public static final String JPA_QUERY = """
                SELECT m FROM MeetingReminderEntity m Join Fetch m.meeting mt
                WHERE m.reminderDateTime = :reminderDateTime AND m.isProcessed = false
                """;

        public static final String JPA_QUERY_PARAM = "reminderDateTime";

        public static final String JOB_PARAMETERS_REMINDER_DATETIME = "reminderDateTime";
        public static final String JOB_PARAMETERS_TIMESTAMP = "timestamp";

        protected static final SmsText.MessageType messageType = SmsText.MessageType.MEETING_REMINDER; // 메시지 타입 정의
    }
}
