package com.kwon.backend.meeting.application.port.in;

import com.kwon.backend.meeting.application.dto.TimeConfirmDto;

public interface FindTimeConfirmsUseCase {
    TimeConfirmDto find(Long groupCode);
}
