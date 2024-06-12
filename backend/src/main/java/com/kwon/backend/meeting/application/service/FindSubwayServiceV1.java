package com.kwon.backend.meeting.application.service;

import com.kwon.backend.meeting.application.port.in.FindSubwayUseCase;
import com.kwon.backend.meeting.application.port.out.FindSubwayPort;
import com.kwon.backend.meeting.domain.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FindSubwayServiceV1 implements FindSubwayUseCase {

    private final FindSubwayPort findSubwayPort;

    @Override
    public List<Place> find(String subwayName) {
        return findSubwayPort.findBySubwayName(subwayName);
    }
}
