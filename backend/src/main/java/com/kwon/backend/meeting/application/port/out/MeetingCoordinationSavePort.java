package com.kwon.backend.meeting.application.port.out;

import com.kwon.backend.meeting.domain.MeetingCoordination;

public interface MeetingCoordinationSavePort {
    MeetingCoordination save(Long groupCode, MeetingCoordination meetingCoordination);
}
