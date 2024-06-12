package com.kwon.backend.meeting.domain;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MeetingCoordination {
    private Long id;
    private List<AvailableTime> availableTimes;
    private Place selectMeetingPlace;
    private String phoneNumber;
    private Meeting meeting;
}
