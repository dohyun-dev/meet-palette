package com.kwon.backend.meeting.adaptor.in.dto;

import com.kwon.backend.meeting.domain.Place;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlaceDto {
    private Long placeId;
    private Long id;
    private String placeName;
    private Double latitude;
    private Double longitude;

    public PlaceDto(Place place) {
        this.placeId = place.getPlaceId();
        this.id = place.getId();
        this.placeName = place.getPlaceName();
        this.latitude = place.getLatitude();
        this.longitude = place.getLongitude();
    }
}
