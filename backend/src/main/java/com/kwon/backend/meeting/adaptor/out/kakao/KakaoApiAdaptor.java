package com.kwon.backend.meeting.adaptor.out.kakao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kwon.backend.meeting.adaptor.out.persistence.entity.PlaceEntity;
import com.kwon.backend.meeting.application.port.out.FindNearestStationPort;
import com.kwon.backend.meeting.application.port.out.FindSubwayPort;
import com.kwon.backend.meeting.domain.Place;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class KakaoApiAdaptor implements FindNearestStationPort, FindSubwayPort {

    private final RestTemplate restTemplate;
    private static final String FIND_NEAREST_STATION_URL =
            "https://dapi.kakao.com/v2/local/search/category.json?category_group_code=SW8&x=%f&y=%f&radius=20000";
    private static final String FIND_BY_SUBWAY_NAME_URL =
            "https://dapi.kakao.com/v2/local/search/keyword.json?query=%s&category_group_code=SW8";
    private final HttpHeaders headers;

    public KakaoApiAdaptor(
            RestTemplate restTemplate,
            @Value("${kakao.apiKey}") String kakaoApiKey
    ) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "KakaoAK " + kakaoApiKey);
        this.restTemplate = restTemplate;
        this.headers = headers;
    }

    @Override
    public Place findNearestStation(Double latitude, Double longitude) {
        String url = String.format(FIND_NEAREST_STATION_URL, longitude, latitude);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return parsePlace(response);
    }

    @Override
    public List<Place> findBySubwayName(String subwayName) {
        String url = String.format(FIND_BY_SUBWAY_NAME_URL, subwayName);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return parsePlaces(response);
    }

    private Place parsePlace(ResponseEntity<String> response) {
        try {
            JsonNode root = new ObjectMapper().readTree(response.getBody());
            JsonNode documents = root.path("documents");

            if (documents.isArray() && documents.size() > 0) {
                JsonNode firstStation = documents.get(0);
                return mapToPlaceEntity(firstStation);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse response", e);
        }
        return null;
    }

    private List<Place> parsePlaces(ResponseEntity<String> response) {
        List<Place> places = new ArrayList<>();
        try {
            JsonNode root = new ObjectMapper().readTree(response.getBody());
            JsonNode documents = root.path("documents");

            if (documents.isArray()) {
                for (JsonNode node : documents) {
                    Place place = mapToPlaceEntity(node);
                    places.add(place);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse response", e);
        }
        return places;
    }

    public Place mapToPlaceEntity(JsonNode node) {
        Map<String, Object> placeMap = null;

        try {
            placeMap = new ObjectMapper().treeToValue(node, Map.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new RuntimeException("파싱실패");
        }

        Long id = Long.valueOf((String) placeMap.get("id"));
        String placeName = (String) placeMap.get("place_name");
        Double latitude = Double.valueOf((String) placeMap.get("y"));
        Double longitude = Double.valueOf((String) placeMap.get("x"));

        return Place.builder()
                .id(id)
                .placeName(placeName)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
