package com.kwon.backend.meeting.application.service;

import com.kwon.backend.meeting.application.port.in.FindMeetingUseCase;
import com.kwon.backend.meeting.application.port.out.FindMeetingPort;
import com.kwon.backend.meeting.domain.Meeting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FindMeetingServiceV1 implements FindMeetingUseCase {

    private final FindMeetingPort findMeetingPort;

    @Transactional(readOnly = true)
    @Override
    public Meeting find(Long groupCode) {
        return findMeetingPort.findMeeting(groupCode);
    }
}
