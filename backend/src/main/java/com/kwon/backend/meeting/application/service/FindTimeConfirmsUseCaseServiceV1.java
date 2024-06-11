package com.kwon.backend.meeting.application.service;

import com.kwon.backend.meeting.application.dto.HourPerDateDto;
import com.kwon.backend.meeting.application.dto.TimeConfirmDto;
import com.kwon.backend.meeting.application.port.in.FindTimeConfirmsUseCase;
import com.kwon.backend.meeting.application.port.out.FindMeetingPort;
import com.kwon.backend.meeting.domain.Meeting;
import kotlin.ranges.IntRange;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FindTimeConfirmsUseCaseServiceV1 implements FindTimeConfirmsUseCase {

    private final FindMeetingPort findMeetingPort;

    @Override
    public TimeConfirmDto find(Long groupCode) {

        Meeting meeting = findMeetingPort.findMeeting(groupCode);

        Map<LocalDate, Map<Integer, Long>> dateHourCountMap = meeting.getMeetingCoordinations().stream()
                .flatMap(meetingCoordination ->
                        meetingCoordination.getAvailableTimes().stream()
                                .flatMap(availableTime -> {
                                    LocalDate startDate = availableTime.getStartTime().toLocalDate();
                                    LocalDate endDate = availableTime.getEndTime().toLocalDate();
                                    LocalTime start = availableTime.getStartTime().toLocalTime();
                                    LocalTime end = availableTime.getEndTime().toLocalTime();

                                    IntStream intStream = startDate.equals(endDate)
                                            ? start.equals(end)
                                            ? IntStream.rangeClosed(start.getHour(), end.getHour()) // 같은 날에 선택한 시간이 같을때
                                            : IntStream.range(start.getHour(), end.getHour()) // 같은 날에 선택한 시간이 다를때
                                            : IntStream.range(start.getHour(), 24); // 다른 날일때

                                    return intStream.mapToObj(hour -> Map.entry(startDate, hour));
                                })
                                .distinct()
                )
                // 날짜별로 시간을 그룹화
                .collect(Collectors.groupingBy(
                        Map.Entry::getKey, // LocalDate (날짜) 기준으로 그룹화
                        Collectors.groupingBy(
                                Map.Entry::getValue, // 시간 (Integer) 기준으로 그룹화
                                Collectors.counting() // 각 시간대의 개수 세기
                        )
                ));

        List<HourPerDateDto> availableTimes = dateHourCountMap.entrySet().stream()
                .map(dateEntry -> {
                    LocalDate date = dateEntry.getKey();
                    List<HourPerDateDto.CountByHour> countByHours = dateEntry.getValue().entrySet().stream()
                            .map(hourEntry -> new HourPerDateDto.CountByHour(hourEntry.getKey(), hourEntry.getValue().intValue()))
                            .sorted()
                            .collect(Collectors.toList());

                    return new HourPerDateDto(date, countByHours);
                })
                .sorted()
                .collect(Collectors.toList());

        int meetingCoordinationsSize = meeting.getMeetingCoordinations().size();

        return TimeConfirmDto.builder()
                .availableTimes(availableTimes)
                .participantsCount(meetingCoordinationsSize)
                .isEveryOneParticipation(meeting.getParticipantsCount() <= meetingCoordinationsSize)
                .build();
    }
}
