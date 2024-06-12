package com.kwon.backend.meeting.application.service;

import com.kwon.backend.meeting.application.port.in.MeetingReminderUseCase;
import com.kwon.backend.meeting.application.port.out.MeetingReminderPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MeetingReminderServiceV1 implements MeetingReminderUseCase {

    private final MeetingReminderPort meetingReminderPort;

    @Transactional
    @Override
    public void reminder(Long groupCode, String phoneNumber) {
        meetingReminderPort.reminder(groupCode, phoneNumber);
    }
}
