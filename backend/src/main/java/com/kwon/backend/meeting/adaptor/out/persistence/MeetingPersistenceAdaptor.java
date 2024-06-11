package com.kwon.backend.meeting.adaptor.out.persistence;

import com.kwon.backend.meeting.adaptor.out.persistence.entity.*;
import com.kwon.backend.meeting.adaptor.out.persistence.repository.MeetingReminderRepository;
import com.kwon.backend.meeting.adaptor.out.persistence.repository.MeetingRepository;
import com.kwon.backend.meeting.adaptor.out.persistence.repository.PlaceRepository;
import com.kwon.backend.meeting.application.port.out.*;
import com.kwon.backend.meeting.domain.Meeting;
import com.kwon.backend.meeting.domain.MeetingCoordination;
import com.kwon.backend.meeting.domain.Place;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MeetingPersistenceAdaptor
        implements MeetingSavePort, MeetingCoordinationSavePort, FindMeetingPort, ConfirmMeetingPort,
        SavePlacePort, MeetingReminderPort {

    private final ModelMapper mapper;
    private final MeetingRepository meetingRepository;
    private final MeetingReminderRepository meetingReminderRepository;
    private final PlaceRepository placeRepository;

    @Override
    public Meeting save(Meeting meeting) {
        MeetingEntity meetingEntity = mapper.map(meeting, MeetingEntity.class);

        MeetingConditionEntity meetingCondition = meetingEntity.getMeetingCondition();
        meetingCondition.setMeeting(meetingEntity);

        meetingCondition.getCandidatePlaces().forEach(
                p -> p.setMeetingCondition(meetingCondition)
        );

        meetingEntity.setMeetingCondition(meetingCondition);

        return mapper.map( meetingRepository.save(meetingEntity), Meeting.class);
    }

    @Override
    public MeetingCoordination save(Long groupCode, MeetingCoordination meetingCoordination) {
        MeetingCoordinationEntity meetingCoordinationEntity = mapper.map(
                meetingCoordination, MeetingCoordinationEntity.class
        );

        PlaceEntity placeEntity = findPlaceByPlaceId(meetingCoordinationEntity.getSelectMeetingPlace().getPlaceId());

        meetingCoordinationEntity.setSelectMeetingPlace(placeEntity);

        meetingCoordinationEntity.getAvailableTimes().stream()
                .forEach(at -> at.setMeetingCoordination(meetingCoordinationEntity));

        MeetingEntity meetingEntity = findMeetingByGroupCode(groupCode);

        meetingEntity.addCoordination(meetingCoordinationEntity);

        return mapper.map(meetingCoordinationEntity, MeetingCoordination.class);
    }

    @Override
    public Meeting findMeeting(Long groupCode) {
        return mapper.map(findMeetingByGroupCode(groupCode), Meeting.class);
    }

    @Override
    public Meeting findMeetingWithLock(Long groupCode) {
        return mapper.map(findMeetingByGroupCode(groupCode, true), Meeting.class);
    }

    @Override
    public Meeting confirm(Meeting meeting) {
        MeetingEntity confirmParam = mapper.map(meeting, MeetingEntity.class);

        MeetingEntity meetingEntity = findMeetingByGroupCode(meeting.getGroupCode());

        PlaceEntity meetingPlace = placeRepository.save(confirmParam.getMeetingPlace());

        meetingEntity.confirm(meetingPlace, confirmParam.getMeetingTime());

        return mapper.map(meetingEntity, Meeting.class);
    }

    @Override
    public Place save(Place place) {
        PlaceEntity placeEntity = placeRepository.save(mapper.map(place, PlaceEntity.class));
        return mapper.map(placeEntity, Place.class);
    }

    @Override
    public void reminder(Long groupCode, String phoneNumber) {
        MeetingEntity meetingEntity = findMeetingByGroupCode(groupCode);

        if (meetingReminderRepository.findByMeetingAndPhoneNumber(meetingEntity, phoneNumber).isPresent())
            throw new RuntimeException("이미 알림 설정을 진행하셨습니다.");

        LocalDateTime reminderDateTime = meetingEntity.getMeetingTime().minusDays(3);

        MeetingReminderEntity meetingReminderEntity = MeetingReminderEntity.builder()
                .meeting(meetingEntity)
                .phoneNumber(phoneNumber)
                .reminderDateTime(reminderDateTime)
                .isProcessed(false)
                .build();

        meetingReminderRepository.save(meetingReminderEntity);
    }

    private MeetingEntity findMeetingByGroupCode(Long groupCode) {
        return meetingRepository.findById(groupCode)
                .orElseThrow(() -> new RuntimeException(groupCode + "가 존재하지 않습니다."));
    }

    private MeetingEntity findMeetingByGroupCode(Long groupCode, boolean isLock) {
        return meetingRepository.findByIdForUpdate(groupCode)
                .orElseThrow(() -> new RuntimeException(groupCode + "가 존재하지 않습니다."));
    }

    public PlaceEntity findPlaceByPlaceId(Long placeId) {
        return placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException());
    }
}
