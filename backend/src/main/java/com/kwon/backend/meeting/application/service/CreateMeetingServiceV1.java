package com.kwon.backend.meeting.application.service;

import com.kwon.backend.common.util.tsid.TSIDFactory;
import com.kwon.backend.meeting.application.dto.MeetingDto;
import com.kwon.backend.meeting.application.port.in.CreateMeetingUseCase;
import com.kwon.backend.meeting.application.port.out.MeetingSavePort;
import com.kwon.backend.meeting.domain.Meeting;
import com.kwon.backend.meeting.domain.MeetingCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateMeetingServiceV1 implements CreateMeetingUseCase {

    private final MeetingSavePort meetingSavePort;

    @Transactional
    @Override
    public String create(MeetingDto.CreateCommand command) {
        Long groupCode = TSIDFactory.generateTSID();

        MeetingCondition meetingCondition = MeetingCondition.builder()
                .meetingDateRangeStart(command.getMeetingDateRangeStart())
                .meetingDateRangeEnd(command.getMeetingDateRangeEnd())
                .placeCoordinationType(command.getPlaceCoordinationType())
                .candidatePlaces(command.getCandidatePlaces())
                .build();

        Meeting newMeeting = Meeting.create(
                groupCode,
                command.getMeetingName(),
                command.getMeetingParticipantsCount(),
                meetingCondition
        );

        Meeting saveMeeting = meetingSavePort.save(newMeeting);

        return saveMeeting.getGroupCode().toString();
    }
}
