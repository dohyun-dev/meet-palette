package com.kwon.backend.meeting.application.port.out;

import com.kwon.backend.meeting.domain.Meeting;

public interface MeetingSavePort {
    Meeting save(Meeting meeting);
}
