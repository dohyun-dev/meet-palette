package com.kwon.backend.meeting.adaptor.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MeetingCoordinationEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meeting_id")
    private MeetingEntity meeting;

    @OneToMany(mappedBy = "meetingCoordination", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AvailableTimeEntity> availableTimes;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "select_meeting_place_id")
    private PlaceEntity selectMeetingPlace;

    private String phoneNumber;

    public void setMeeting(MeetingEntity meeting) {
        this.meeting = meeting;
    }

    public void setSelectMeetingPlace(PlaceEntity selectMeetingPlace) {
        this.selectMeetingPlace = selectMeetingPlace;
    }
}
