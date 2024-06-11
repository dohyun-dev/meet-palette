package com.kwon.backend.meeting.adaptor.out.persistence.repository;

import com.kwon.backend.meeting.adaptor.out.persistence.entity.MeetingConditionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingConditionRepository extends JpaRepository<MeetingConditionEntity, Long> {
}
