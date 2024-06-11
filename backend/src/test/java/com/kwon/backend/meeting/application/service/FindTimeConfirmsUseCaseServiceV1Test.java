package com.kwon.backend.meeting.application.service;

import com.kwon.backend.meeting.application.dto.HourPerDateDto;
import com.kwon.backend.meeting.application.dto.TimeConfirmDto;
import com.kwon.backend.meeting.application.port.out.FindMeetingPort;
import com.kwon.backend.meeting.domain.AvailableTime;
import com.kwon.backend.meeting.domain.Meeting;
import com.kwon.backend.meeting.domain.MeetingCoordination;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class FindTimeConfirmsUseCaseServiceV1Test {
    @Mock
    private FindMeetingPort findMeetingPort;

    @InjectMocks
    private FindTimeConfirmsUseCaseServiceV1 findTimeCoordinationsService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFind() {
        // Given
        Long groupCode = 1L;

        AvailableTime availableTime1 = new AvailableTime(
                LocalDateTime.of(2023, 6, 5, 10, 0),
                LocalDateTime.of(2023, 6, 5, 12, 0));

        AvailableTime availableTime2 = new AvailableTime(
                LocalDateTime.of(2023, 6, 5, 11, 0),
                LocalDateTime.of(2023, 6, 5, 13, 0)
        );

        MeetingCoordination coordination = MeetingCoordination.builder()
                .availableTimes(Arrays.asList(availableTime1, availableTime2))
                .build();

        Meeting meeting = Meeting.builder()
                .groupCode(groupCode)
                .participantsCount(1)
                .isConfirmMeeting(false)
                .meetingCoordinations(Collections.singletonList(coordination))
                .build();

        when(findMeetingPort.findMeeting(groupCode)).thenReturn(meeting);

        // When
        List<HourPerDateDto> result = findTimeCoordinationsService.find(groupCode).getAvailableTimes();

        // Then
        assertEquals(1, result.size());

        HourPerDateDto timeConfirmDto = result.get(0);
        assertEquals(4, timeConfirmDto.getCountByHours().size());

        for (HourPerDateDto.CountByHour countByHour : timeConfirmDto.getCountByHours()) {
            assertEquals(1, countByHour.count());
        }
    }
}