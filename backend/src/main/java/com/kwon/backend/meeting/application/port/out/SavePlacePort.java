package com.kwon.backend.meeting.application.port.out;

import com.kwon.backend.meeting.domain.Place;

public interface SavePlacePort {
    Place save(Place place);
}
