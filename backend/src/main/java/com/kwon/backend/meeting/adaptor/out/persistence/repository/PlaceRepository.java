package com.kwon.backend.meeting.adaptor.out.persistence.repository;

import com.kwon.backend.meeting.adaptor.out.persistence.entity.PlaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<PlaceEntity, Long> {
}
