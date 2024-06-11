package com.kwon.backend.meeting.adaptor.out.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PlaceEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;
    private Long id;
    private String placeName;
    private Double latitude;
    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_condition_id")
    private MeetingConditionEntity meetingCondition;

    public void setMeetingCondition(MeetingConditionEntity meetingCondition) {
        this.meetingCondition = meetingCondition;
    }
}
