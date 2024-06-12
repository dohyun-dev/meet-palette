package com.kwon.backend.meeting.application.port.in;

import com.kwon.backend.meeting.domain.Meeting;

public interface FindMeetingUseCase {
    Meeting find(Long groupCode);
}
