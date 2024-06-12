package com.kwon.backend.meeting.application.port.out;

import com.kwon.backend.meeting.domain.Meeting;

public interface ConfirmMeetingPort {
    Meeting confirm(Meeting meeting);
}
