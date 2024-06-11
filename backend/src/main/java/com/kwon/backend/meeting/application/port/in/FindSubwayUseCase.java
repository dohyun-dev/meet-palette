package com.kwon.backend.meeting.application.port.in;

import com.kwon.backend.meeting.domain.Place;

import java.util.List;

public interface FindSubwayUseCase {
    List<Place> find(String subwayName);
}
