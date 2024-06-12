package com.kwon.backend.common.util.sms;

import com.kwon.backend.meeting.domain.Meeting;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

public class SmsText {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일", Locale.KOREAN);
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH시", Locale.KOREAN);

    public static String createMessage(MessageType messageType, Meeting meeting, String url) {
        LocalDateTime meetingTime = meeting.getMeetingTime();

        String meetingName = meeting.getMeetingName();
        String date = meetingTime.format(DATE_FORMATTER);
        String time = meetingTime.format(TIME_FORMATTER);
        String dayOfWeek = meetingTime.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.KOREAN);
        String placeName = meeting.getMeetingPlace().getPlaceName();

        return messageType.text.formatted(
                meetingName,
                date + " " + dayOfWeek,
                time,
                placeName,
                meeting.getParticipantsCount(),
                url + "%s".formatted(meeting.getGroupCode())
        );
    }

    public enum MessageType {
        MEETING_CONFIRM(
                "Meet Palette에서 약속이 확정되었습니다.",
                """
                약속명 : %s
                날짜: %s
                시간: %s
                위치: %s
                인원: %s
            
                장소 추천 및 더 자세한 정보는 Meet Palette에 접속하여 확인하실 수 있습니다.
                함께하는 모든 순간이 아름다운 색채로 가득하시길 바랍니다 :)
            
                접속링크 : %s
                """
        ),
        MEETING_REMINDER(
                "다가오는 약속이 있어요!",
                """
                    Meet Palette에서 확정된 약속이 3일 뒤 예정되어 있습니다 :)
                    
                    약속명 : %s
                    날짜 : %s
                    시간 : %s
                    위치 : %s
                    인원 : %s
                    
                    장소 추천 및 더 자세한 정보는 Meet Palette에 접속하여 확인하실 수 있습니다.
                    
                    접속링크 : %s
                    """
        );

        private String subject;
        private String text;

        MessageType(String subject, String text) {
            this.subject = subject;
            this.text = text;
        }

        public String getSubject() {
            return subject;
        }
    }
}
