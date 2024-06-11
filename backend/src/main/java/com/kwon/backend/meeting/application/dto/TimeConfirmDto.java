package com.kwon.backend.meeting.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class TimeConfirmDto {
    private List<HourPerDateDto> availableTimes;
    private int participantsCount;
    private boolean isEveryOneParticipation;
}
