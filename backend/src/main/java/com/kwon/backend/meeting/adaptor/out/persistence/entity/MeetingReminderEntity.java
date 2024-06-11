package com.kwon.backend.meeting.adaptor.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MeetingReminderEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private MeetingEntity meeting;

    private String phoneNumber;

    private LocalDateTime reminderDateTime;

    private Boolean isProcessed;

    @Builder
    public MeetingReminderEntity(MeetingEntity meeting, String phoneNumber, LocalDateTime reminderDateTime, Boolean isProcessed) {
        this.meeting = meeting;
        this.phoneNumber = phoneNumber;
        this.reminderDateTime = reminderDateTime;
        this.isProcessed = isProcessed;
    }

    public void completeProcessing() {
        this.isProcessed = true;
    }
}
