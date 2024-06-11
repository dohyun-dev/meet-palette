package com.kwon.backend.meeting.adaptor.out.persistence.entity;

import com.kwon.backend.meeting.domain.PlaceCoordinationType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MeetingConditionEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "meeting_id")
    private MeetingEntity meeting;

    private LocalDate meetingDateRangeStart;
    private LocalDate meetingDateRangeEnd;

    @Enumerated(EnumType.STRING)
    private PlaceCoordinationType placeCoordinationType;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlaceEntity> candidatePlaces = new ArrayList<>();

    @Builder
    public MeetingConditionEntity(Long id, MeetingEntity meeting, LocalDate meetingDateRangeStart, LocalDate meetingDateRangeEnd, PlaceCoordinationType placeCoordinationType, List<PlaceEntity> candidatePlaces) {
        this.id = id;
        this.meeting = meeting;
        this.meetingDateRangeStart = meetingDateRangeStart;
        this.meetingDateRangeEnd = meetingDateRangeEnd;
        this.placeCoordinationType = placeCoordinationType;
        this.candidatePlaces = candidatePlaces;
    }

    public void addCandidatePlaces(PlaceEntity candidatePlace) {
        candidatePlaces.add(candidatePlace);
        candidatePlace.setMeetingCondition(this);
    }

    public void setMeeting(MeetingEntity meeting) {
        this.meeting = meeting;
    }

    public void setCandidatePlaces(List<PlaceEntity> candidatePlaces) {
        this.candidatePlaces = candidatePlaces;
    }
}
