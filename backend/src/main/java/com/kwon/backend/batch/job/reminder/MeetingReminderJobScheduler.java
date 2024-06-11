package com.kwon.backend.batch.job.reminder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

import static com.kwon.backend.batch.job.reminder.MeetingReminderJobConfig.Constant.JOB_PARAMETERS_REMINDER_DATETIME;
import static com.kwon.backend.batch.job.reminder.MeetingReminderJobConfig.Constant.JOB_PARAMETERS_TIMESTAMP;

@Slf4j
@Component
@RequiredArgsConstructor
public class MeetingReminderJobScheduler {

    private final JobLauncher jobLauncher;
    private final Job meetingReminderJob;

    @Scheduled(cron = "0 0 * * * *") // 매시 정각에 실행
    public void runJob() throws Exception {
        LocalDateTime reminderDateTime = LocalDateTime.now()
                .withMinute(0)
                .withSecond(0)
                .withNano(0);

        JobParameters jobParameters = new JobParametersBuilder()
                .addLocalDateTime(JOB_PARAMETERS_REMINDER_DATETIME, reminderDateTime)
                .addLong(JOB_PARAMETERS_TIMESTAMP, System.currentTimeMillis())
                .toJobParameters();

        jobLauncher.run(
                meetingReminderJob,
                jobParameters
        );
    }
}