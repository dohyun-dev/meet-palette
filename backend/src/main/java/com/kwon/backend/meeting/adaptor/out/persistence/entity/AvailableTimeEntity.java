package com.kwon.backend.meeting.adaptor.out.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AvailableTimeEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_coordination_id")
    private MeetingCoordinationEntity meetingCoordination;

    public void setMeetingCoordination(MeetingCoordinationEntity meetingCoordination) {
        this.meetingCoordination = meetingCoordination;
    }
}
