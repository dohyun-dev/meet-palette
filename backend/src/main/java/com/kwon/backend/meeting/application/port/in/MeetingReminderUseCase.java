package com.kwon.backend.meeting.application.port.in;

public interface MeetingReminderUseCase {
    void reminder(Long groupCode, String phoneNumber);
}
