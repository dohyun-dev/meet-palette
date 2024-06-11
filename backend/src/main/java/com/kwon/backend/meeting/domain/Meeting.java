package com.kwon.backend.meeting.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meeting {

    // 그룹 코드
    private Long groupCode;

    // 약속 이름
    private String meetingName;

    // 참가자 수
    private Integer participantsCount;

    // 약속 장소
    private Place meetingPlace;

    // 약속 시간
    private LocalDateTime meetingTime;

    // 약속 조정 조건
    private MeetingCondition meetingCondition;

    // 약속 확정 여부
    private Boolean isConfirmMeeting;

    // 약속 조정 제안들
    private List<MeetingCoordination> meetingCoordinations = new ArrayList<>();

    @Builder
    public Meeting(
            Long groupCode, String meetingName, Integer participantsCount, Place meetingPlace,
            LocalDateTime meetingTime, MeetingCondition meetingCondition, Boolean isConfirmMeeting,
            List<MeetingCoordination> meetingCoordinations
    ) {
        this.groupCode = groupCode;
        this.meetingName = meetingName;
        this.participantsCount = participantsCount;
        this.meetingPlace = meetingPlace;
        this.meetingTime = meetingTime;
        this.meetingCondition = meetingCondition;
        this.isConfirmMeeting = isConfirmMeeting;
        this.meetingCoordinations = ObjectUtils.isEmpty(meetingCoordinations) ? new ArrayList<>() : meetingCoordinations;
    }

    public static Meeting create(
            Long groupCode, String meetingName, int participantsCount,
            MeetingCondition meetingCondition
    ) {
        Meeting meeting = Meeting.builder()
                .groupCode(groupCode)
                .meetingName(meetingName)
                .participantsCount(participantsCount)
                .meetingCondition(meetingCondition)
                .isConfirmMeeting(false)
                .build();
        return meeting;
    }

    public void confirmMeeting(Place confirmPlace, LocalDateTime confirmDateTime) {
        this.meetingPlace = confirmPlace;
        this.meetingTime = confirmDateTime;
        this.isConfirmMeeting = true;
    }
}
