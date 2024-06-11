package com.kwon.backend.meeting.adaptor.out.persistence.repository;

import com.kwon.backend.meeting.adaptor.out.persistence.entity.MeetingEntity;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MeetingRepository extends JpaRepository<MeetingEntity, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select m from MeetingEntity m where m.groupCode = :groupCode")
    Optional<MeetingEntity> findByIdForUpdate(Long groupCode);
}
