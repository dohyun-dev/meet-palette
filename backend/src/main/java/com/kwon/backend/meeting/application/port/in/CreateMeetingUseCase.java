package com.kwon.backend.meeting.application.port.in;

import com.kwon.backend.meeting.application.dto.MeetingDto;

public interface CreateMeetingUseCase {

    String create(MeetingDto.CreateCommand command);
}
