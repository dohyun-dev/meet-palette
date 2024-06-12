package com.kwon.backend.meeting.adaptor.in.dto;

import com.kwon.backend.meeting.domain.AvailableTime;
import com.kwon.backend.meeting.domain.PlaceCoordinationType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public abstract class MeetingRequest {
    @Data
    @NoArgsConstructor
    public static class Create {
        private String meetingName;
        private int meetingParticipantsCount;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate meetingDateRangeStart;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate meetingDateRangeEnd;
        private PlaceCoordinationType placeCoordinationType;
        private List<PlaceDto> candidatePlaces;
    }

    @Data
    @NoArgsConstructor
    public static class EnterGroup {
        private List<AvailableTime> availableTimes;
        private PlaceDto selectMeetingPlace;
        private String phoneNumber;
    }

    @Data
    @NoArgsConstructor
    public static class ConfirmMeeting {
        private LocalDateTime confirmDateTime;
    }

    @Data
    @NoArgsConstructor
    public static class Reminder {
        private String phoneNumber;
    }
}
