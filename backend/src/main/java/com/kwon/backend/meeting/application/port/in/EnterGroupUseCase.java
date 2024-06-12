package com.kwon.backend.meeting.application.port.in;

import com.kwon.backend.meeting.application.dto.MeetingDto;

public interface EnterGroupUseCase {
    void enter(Long groupCode, MeetingDto.EnterGroupCommand command);
}
