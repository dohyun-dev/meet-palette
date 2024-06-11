package com.kwon.backend.meeting.application.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class HourPerDateDto implements Comparable<HourPerDateDto> {
    private LocalDate date;
    private List<CountByHour> countByHours;
    private int participantsCount;

    public HourPerDateDto(LocalDate date, List<CountByHour> countByHours) {
        this.date = date;
        this.countByHours = countByHours;
    }

    @Override
    public int compareTo(HourPerDateDto o) {
        return this.getDate().compareTo(o.getDate());
    }

    public record CountByHour(int hour, int count) implements Comparable<CountByHour> {
        @Override
        public int compareTo(CountByHour o) {
            return this.hour() - o.hour();
        }
    }
}
