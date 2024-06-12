package com.kwon.backend.meeting.adaptor.in.dto;

import com.kwon.backend.meeting.domain.Meeting;
import com.kwon.backend.meeting.domain.PlaceCoordinationType;
import lombok.Data;
import org.springframework.util.ObjectUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class MeetingResponseDto {
    // 그룹 코드
    private Long groupCode;

    // 약속 이름
    private String meetingName;

    // 참가자 수
    private Integer participantsCount;

    private String groupLeader;

    // 참가자 연락처 목록
    private List<String> participants;

    // 약속 장소
    private PlaceDto meetingPlace;

    // 약속 시간
    private LocalDateTime meetingTime;

    // 약속 확정 여부
    private Boolean isConfirmMeeting;

    // 약속 조정 제안들
    private List<MeetingCoordinationDto> meetingCoordinations;

    // 약속 조건
    private LocalDate meetingDateRangeStart;

    private LocalDate meetingDateRangeEnd;

    private PlaceCoordinationType placeCoordinationType;

    private List<PlaceDto> candidatePlaces;

    public MeetingResponseDto(Meeting meeting) {
        this.groupCode = meeting.getGroupCode();
        this.meetingName = meeting.getMeetingName();
        this.participantsCount = meeting.getParticipantsCount();;
        this.meetingPlace = ObjectUtils.isEmpty(meeting.getMeetingPlace()) ? null : new PlaceDto(meeting.getMeetingPlace());
        this.meetingTime = meeting.getMeetingTime();
        this.isConfirmMeeting = meeting.getIsConfirmMeeting();
        this.meetingCoordinations = meeting.getMeetingCoordinations().stream()
                .map(c -> new MeetingCoordinationDto(c))
                .toList();
        this.meetingDateRangeStart = meeting.getMeetingCondition().getMeetingDateRangeStart();
        this.meetingDateRangeEnd = meeting.getMeetingCondition().getMeetingDateRangeEnd();
        this.placeCoordinationType = meeting.getMeetingCondition().getPlaceCoordinationType();
        this.candidatePlaces = meeting.getMeetingCondition().getCandidatePlaces().stream()
                .map(p -> new PlaceDto(p))
                .toList();
    }
}
