package com.kwon.backend.meeting.application.port.out;

import com.kwon.backend.meeting.domain.Place;

import java.util.List;

public interface FindSubwayPort {
    List<Place> findBySubwayName(String subwayName);
}
