package com.kwon.backend.meeting.application.port.out;

import com.kwon.backend.meeting.domain.Meeting;

public interface FindMeetingPort {
    Meeting findMeeting(Long groupCode);
    Meeting findMeetingWithLock(Long groupCode);
}
