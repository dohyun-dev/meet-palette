package com.kwon.backend.meeting.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Place {
    private Long placeId;
    private Long id;
    private String placeName;
    private Double latitude;
    private Double longitude;
    private MeetingCondition meetingCondition;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Place place = (Place) o;
        return Objects.equals(getId(), place.getId()) && Objects.equals(getPlaceName(), place.getPlaceName()) && Objects.equals(getLatitude(), place.getLatitude()) && Objects.equals(getLongitude(), place.getLongitude());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getPlaceName(), getLatitude(), getLongitude());
    }
}
