package com.kwon.backend.meeting.application.port.in;

import java.time.LocalDateTime;

public interface ConfirmMeetingUseCase {
    void confirm(Long groupCode, LocalDateTime confirmDateTime);
}
