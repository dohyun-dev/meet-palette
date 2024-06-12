package com.kwon.backend.meeting.application.dto;

import com.kwon.backend.meeting.domain.AvailableTime;
import com.kwon.backend.meeting.domain.Place;
import com.kwon.backend.meeting.domain.PlaceCoordinationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

public abstract class MeetingDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateCommand {
        private String meetingName;
        private int meetingParticipantsCount;
        private LocalDate meetingDateRangeStart;
        private LocalDate meetingDateRangeEnd;
        private PlaceCoordinationType placeCoordinationType;
        private List<Place> candidatePlaces;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EnterGroupCommand {
        private List<AvailableTime> availableTimes;
        private Place selectMeetingPlace;
        private String phoneNumber;
    }
}
