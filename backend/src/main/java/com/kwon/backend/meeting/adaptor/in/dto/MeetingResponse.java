package com.kwon.backend.meeting.adaptor.in.dto;

public abstract class MeetingResponse {

    public record Create(
            String groupCode
    ) {
    }

}
