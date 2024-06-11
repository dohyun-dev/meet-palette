package com.kwon.backend.meeting.adaptor.out.persistence.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Persistable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MeetingEntity extends BaseTimeEntity implements Persistable<Long> {
    // 그룹 코드
    @Id
    private Long groupCode;

    // 약속 이름
    private String meetingName;

    // 참가자 수
    private Integer participantsCount;

    // 참가자 연락처 목록
    @ElementCollection
    @CollectionTable(name = "participants", joinColumns = @JoinColumn(name = "meeting_id"))
    @Column(name = "participant")
    private List<String> participants = new ArrayList<>();

    // 약속 장소
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meeting_place_id")
    private PlaceEntity meetingPlace;

    // 약속 시간
    private LocalDateTime meetingTime;

    // 약속 조정 조건
    @OneToOne(mappedBy = "meeting", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private MeetingConditionEntity meetingCondition;

    // 약속 확정 여부
    private Boolean isConfirmMeeting;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MeetingCoordinationEntity> meetingCoordinations = new ArrayList<>();

    @Builder
    public MeetingEntity(
            Long groupCode, String meetingName, Integer participantsCount,
            List<String> participants, PlaceEntity meetingPlace,
            LocalDateTime meetingTime, MeetingConditionEntity meetingCondition,
            Boolean isConfirmMeeting
    ) {
        this.groupCode = groupCode;
        this.meetingName = meetingName;
        this.participantsCount = participantsCount;
        this.participants = participants;
        this.meetingPlace = meetingPlace;
        this.meetingTime = meetingTime;
        this.meetingCondition = meetingCondition;
        this.isConfirmMeeting = isConfirmMeeting;
    }

    @Override
    public Long getId() {
        return groupCode;
    }

    @Override
    public boolean isNew() {
        return getCreatedAt() == null && getUpdatedAt() == null;
    }

    public void setMeetingCondition(MeetingConditionEntity meetingCondition) {
        this.meetingCondition = meetingCondition;
        meetingCondition.setMeeting(this);
    }

    public void addParticipant(String participant) {
        participants.add(participant);
    }

    public void addCoordination(MeetingCoordinationEntity meetingCoordination) {
        meetingCoordinations.add(meetingCoordination);
        meetingCoordination.setMeeting(this);
    }

    public void confirm(PlaceEntity confirmPlace, LocalDateTime confirmDateTime) {
        this.meetingPlace = confirmPlace;
        this.meetingTime = confirmDateTime;
        this.isConfirmMeeting = true;
    }
}
