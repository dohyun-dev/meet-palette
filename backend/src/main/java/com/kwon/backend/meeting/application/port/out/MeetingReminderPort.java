package com.kwon.backend.meeting.application.port.out;

public interface MeetingReminderPort {
    void reminder(Long groupCode, String phoneNumber);
}
