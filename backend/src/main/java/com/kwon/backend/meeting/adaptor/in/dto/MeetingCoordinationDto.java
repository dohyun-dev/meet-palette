package com.kwon.backend.meeting.adaptor.in.dto;

import com.kwon.backend.meeting.domain.AvailableTime;
import com.kwon.backend.meeting.domain.MeetingCoordination;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingCoordinationDto {
    private Long id;
    private List<AvailableTime> availableTimes;
    private PlaceDto selectMeetingPlace;
    private String phoneNumber;

    public MeetingCoordinationDto(MeetingCoordination meetingCoordination) {
        this.id = meetingCoordination.getId();
        this.availableTimes = meetingCoordination.getAvailableTimes();
        this.selectMeetingPlace = new PlaceDto(meetingCoordination.getSelectMeetingPlace());
        this.phoneNumber = meetingCoordination.getPhoneNumber();
    }
}
