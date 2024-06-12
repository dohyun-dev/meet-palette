package com.kwon.backend.meeting.domain;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AvailableTime {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
