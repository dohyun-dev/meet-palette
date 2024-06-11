package com.kwon.backend.meeting.application.service;

import com.kwon.backend.meeting.application.dto.MeetingDto;
import com.kwon.backend.meeting.application.port.in.EnterGroupUseCase;
import com.kwon.backend.meeting.application.port.out.FindMeetingPort;
import com.kwon.backend.meeting.application.port.out.MeetingCoordinationSavePort;
import com.kwon.backend.meeting.application.port.out.SavePlacePort;
import com.kwon.backend.meeting.domain.Meeting;
import com.kwon.backend.meeting.domain.MeetingCoordination;
import com.kwon.backend.meeting.domain.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnterGroupServiceV1 implements EnterGroupUseCase {

    private final FindMeetingPort findMeetingPort;
    private final SavePlacePort savePlacePort;
    private final MeetingCoordinationSavePort meetingCoordinationSavePort;

    @Transactional
    @Override
    public void enter(Long groupCode, MeetingDto.EnterGroupCommand command) {
        Meeting meeting = findMeetingPort.findMeeting(groupCode);

        Set<String> participantPhoneNumbers = meeting.getMeetingCoordinations().stream()
                .map(MeetingCoordination::getPhoneNumber)
                .filter(phoneNumber -> StringUtils.hasLength(phoneNumber))
                .collect(Collectors.toSet());

        if (participantPhoneNumbers.contains(command.getPhoneNumber()))
            throw new RuntimeException("중복된 전화번호가 약속 참가 신청 이력이 있습니다.");

        Place selectMeetingPlace = ObjectUtils.isEmpty(command.getSelectMeetingPlace().getPlaceId())
                ? savePlacePort.save(command.getSelectMeetingPlace())
                : command.getSelectMeetingPlace();

        MeetingCoordination meetingCoordination = MeetingCoordination.builder()
                .availableTimes(command.getAvailableTimes())
                .selectMeetingPlace(selectMeetingPlace)
                .phoneNumber(command.getPhoneNumber())
                .build();

        meetingCoordinationSavePort.save(groupCode, meetingCoordination);
    }
}
