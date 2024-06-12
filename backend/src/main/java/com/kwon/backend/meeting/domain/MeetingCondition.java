package com.kwon.backend.meeting.domain;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MeetingCondition {
    private Long id;
    private LocalDate meetingDateRangeStart;
    private LocalDate meetingDateRangeEnd;
    private PlaceCoordinationType placeCoordinationType;
    private List<Place> candidatePlaces = new ArrayList<>();
}
