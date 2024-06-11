package com.kwon.backend.meeting.adaptor.out.persistence.repository;

import com.kwon.backend.meeting.adaptor.out.persistence.entity.MeetingEntity;
import com.kwon.backend.meeting.adaptor.out.persistence.entity.MeetingReminderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingReminderRepository extends JpaRepository<MeetingReminderEntity, Long> {
    Optional<MeetingReminderEntity> findByMeetingAndPhoneNumber(MeetingEntity meeting, String phoneNumber);
}
