package com.kwon.backend.meeting.adaptor.out.sms;

import com.kwon.backend.common.util.sms.CoolSmsService;
import com.kwon.backend.common.util.sms.SmsText;
import com.kwon.backend.meeting.application.event.MeetingConfirmEvent;
import com.kwon.backend.meeting.domain.MeetingCoordination;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class MeetingConfirmEventListener {
    private final CoolSmsService coolSmsService;
    @Value("${frontEndUrl.placeConfirm}")
    private String PLACE_CONFIRM_URL;

    @EventListener
    public void handleMeetingConfirmEvent(MeetingConfirmEvent event) {
        String messageText = SmsText.createMessage(
                SmsText.MessageType.MEETING_CONFIRM,
                event.getMeeting(),
                PLACE_CONFIRM_URL
        );

        event.getMeeting().getMeetingCoordinations().stream()
                .map(MeetingCoordination::getPhoneNumber)
                .filter(phoneNumber -> StringUtils.hasText(phoneNumber))
                .forEach(phoneNumber -> coolSmsService.sendSms(
                        phoneNumber,
                        SmsText.MessageType.MEETING_CONFIRM.getSubject(),
                        messageText)
                );
    }
}
