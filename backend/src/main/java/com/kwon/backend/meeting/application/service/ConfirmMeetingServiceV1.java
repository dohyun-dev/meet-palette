package com.kwon.backend.meeting.application.service;

import com.kwon.backend.meeting.application.event.MeetingConfirmEvent;
import com.kwon.backend.meeting.application.port.in.ConfirmMeetingUseCase;
import com.kwon.backend.meeting.application.port.out.ConfirmMeetingPort;
import com.kwon.backend.meeting.application.port.out.FindMeetingPort;
import com.kwon.backend.meeting.application.port.out.FindNearestStationPort;
import com.kwon.backend.meeting.domain.Meeting;
import com.kwon.backend.meeting.domain.MeetingCoordination;
import com.kwon.backend.meeting.domain.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConfirmMeetingServiceV1 implements ConfirmMeetingUseCase {

    private final FindMeetingPort findMeetingPort;
    private final FindNearestStationPort findNearestStationPort;
    private final ConfirmMeetingPort confirmMeetingPort;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    @Override
    public void confirm(Long groupCode, LocalDateTime confirmDateTime) {
        Meeting meeting = findMeetingPort.findMeetingWithLock(groupCode);

       if (meeting.getIsConfirmMeeting())
            return;

        Place confirmedPlace = determineConfirmedPlace(meeting);
        meeting.confirmMeeting(confirmedPlace, confirmDateTime);
        confirmMeetingPort.confirm(meeting);

        eventPublisher.publishEvent(new MeetingConfirmEvent(this, meeting));
    }

    private Place determineConfirmedPlace(Meeting meeting) {
        switch (meeting.getMeetingCondition().getPlaceCoordinationType()) {
            case FIXED:
                return getFixedPlace(meeting);
            case VOTE:
                return getVotedPlace(meeting);
            default:
                return getCalculatedMiddlePlace(meeting);
        }
    }

    private Place getFixedPlace(Meeting meeting) {
        return meeting.getMeetingCondition().getCandidatePlaces().get(0);
    }

    private Place getVotedPlace(Meeting meeting) {
        return meeting.getMeetingCoordinations()
                .stream()
                .collect(Collectors.groupingBy(MeetingCoordination::getSelectMeetingPlace, Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }

    private Place getCalculatedMiddlePlace(Meeting meeting) {
        List<MeetingCoordination> coordinations = meeting.getMeetingCoordinations();
        double averageLatitude = coordinations.stream()
                .mapToDouble(coordination -> coordination.getSelectMeetingPlace().getLatitude())
                .average()
                .orElseThrow(() -> new IllegalStateException());

        double averageLongitude = coordinations.stream()
                .mapToDouble(coordination -> coordination.getSelectMeetingPlace().getLongitude())
                .average()
                .orElseThrow(() -> new IllegalStateException());

        return findNearestStationPort.findNearestStation(averageLatitude, averageLongitude);
    }
}
