package com.kwon.backend.meeting.application.event;

import com.kwon.backend.meeting.domain.Meeting;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class MeetingConfirmEvent extends ApplicationEvent {
    private final Meeting meeting;

    public MeetingConfirmEvent(Object source, Meeting meeting) {
        super(source);
        this.meeting = meeting;
    }
}
