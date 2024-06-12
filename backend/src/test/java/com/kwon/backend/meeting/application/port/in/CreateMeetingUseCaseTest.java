// package com.kwon.backend.meeting.application.port.in;
//
// import com.kwon.backend.meeting.application.dto.MeetingDto;
// import com.kwon.backend.meeting.domain.Meeting;
// import com.kwon.backend.meeting.domain.Place;
// import com.kwon.backend.meeting.domain.PlaceCoordinationType;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.transaction.annotation.Transactional;
//
// import java.time.LocalDate;
// import java.util.List;
//
// import static org.assertj.core.api.Assertions.assertThat;
//
// @SpringBootTest
// @Transactional
// class CreateMeetingUseCaseTest {
//
//     @Autowired
//     CreateMeetingUseCase createMeetingUseCase;
//
//     @Test
//     void 미팅_생성_장소_확정() {
//         // Given
//         MeetingDto.CreateCommand command = new MeetingDto.CreateCommand(
//                 "Team Meeting",
//                 5,
//                 "010-1234-5678",
//                 LocalDate.of(2024, 6, 1),
//                 LocalDate.of(2024, 6, 3),
//                 PlaceCoordinationType.FIXED,
//                 List.of(
//                         new Place("Place A", 37.5665, 126.9780)
//                 )
//         );
//
//         // When
//         Meeting meeting = createMeetingUseCase.create(command);
//
//         // Then
//         assertThat(meeting).isNotNull();
//         assertThat(meeting.getMeetingName()).isEqualTo("Team Meeting");
//         assertThat(meeting.getParticipantsCount()).isEqualTo(5);
//         assertThat(meeting.getParticipants().get(0).getPhoneNumber()).isEqualTo("010-1234-5678");
//         assertThat(meeting.getParticipants().get(0).getIsGroupLeader()).isTrue();
//         assertThat(meeting.getMeetingCondition().getMeetingDateRangeStart()).isEqualTo(LocalDate.of(2024, 6, 1));
//         assertThat(meeting.getMeetingCondition().getMeetingDateRangeEnd()).isEqualTo(LocalDate.of(2024, 6, 3));
//         assertThat(meeting.getMeetingCondition().getPlaceCoordinationType()).isEqualTo(PlaceCoordinationType.FIXED);
//         assertThat(meeting.getMeetingCondition().getCandidatePlaces()).hasSize(1);
//         assertThat(meeting.getMeetingCondition().getCandidatePlaces().get(0).getPlaceName()).isEqualTo("Place A");
//     }
//
//     @Test
//     void 미팅_생성_장소_투표() {
//         // Given
//         MeetingDto.CreateCommand command = new MeetingDto.CreateCommand(
//                 "Team Meeting",
//                 5,
//                 "010-1234-5678",
//                 LocalDate.of(2024, 6, 1),
//                 LocalDate.of(2024, 6, 3),
//                 PlaceCoordinationType.VOTE,
//                 List.of(
//                         new Place("Place A", 37.5665, 126.9780),
//                         new Place("Place B", 37.5758, 126.9769)
//                 )
//         );
//
//         // When
//         Meeting meeting = createMeetingUseCase.create(command);
//
//         // Then
//         assertThat(meeting).isNotNull();
//         assertThat(meeting.getMeetingName()).isEqualTo("Team Meeting");
//         assertThat(meeting.getParticipantsCount()).isEqualTo(5);
//         assertThat(meeting.getParticipants().get(0).getPhoneNumber()).isEqualTo("010-1234-5678");
//         assertThat(meeting.getParticipants().get(0).getIsGroupLeader()).isTrue();
//         assertThat(meeting.getMeetingCondition().getMeetingDateRangeStart()).isEqualTo(LocalDate.of(2024, 6, 1));
//         assertThat(meeting.getMeetingCondition().getMeetingDateRangeEnd()).isEqualTo(LocalDate.of(2024, 6, 3));
//         assertThat(meeting.getMeetingCondition().getPlaceCoordinationType()).isEqualTo(PlaceCoordinationType.VOTE);
//         assertThat(meeting.getMeetingCondition().getCandidatePlaces()).hasSize(2);
//         assertThat(meeting.getMeetingCondition().getCandidatePlaces().get(0).getPlaceName()).isEqualTo("Place A");
//         assertThat(meeting.getMeetingCondition().getCandidatePlaces().get(1).getPlaceName()).isEqualTo("Place B");
//     }
//
//     @Test
//     void 미팅_생성_중간_장소_계산() {
//         // Given
//         MeetingDto.CreateCommand command = new MeetingDto.CreateCommand(
//                 "Team Meeting",
//                 5,
//                 "010-1234-5678",
//                 LocalDate.of(2024, 6, 1),
//                 LocalDate.of(2024, 6, 3),
//                 PlaceCoordinationType.CALC_MIDDLE_POSITION,
//                 List.of(
//                         new Place("Place A", 37.5665, 126.9780),
//                         new Place("Place B", 37.5758, 126.9769)
//                 )
//         );
//
//         // When
//         Meeting meeting = createMeetingUseCase.create(command);
//
//         // Then
//         assertThat(meeting).isNotNull();
//         assertThat(meeting.getMeetingName()).isEqualTo("Team Meeting");
//         assertThat(meeting.getParticipantsCount()).isEqualTo(5);
//         assertThat(meeting.getParticipants().get(0).getPhoneNumber()).isEqualTo("010-1234-5678");
//         assertThat(meeting.getParticipants().get(0).getIsGroupLeader()).isTrue();
//         assertThat(meeting.getMeetingCondition().getMeetingDateRangeStart()).isEqualTo(LocalDate.of(2024, 6, 1));
//         assertThat(meeting.getMeetingCondition().getMeetingDateRangeEnd()).isEqualTo(LocalDate.of(2024, 6, 3));
//         assertThat(meeting.getMeetingCondition().getPlaceCoordinationType()).isEqualTo(PlaceCoordinationType.CALC_MIDDLE_POSITION);
//         assertThat(meeting.getMeetingCondition().getCandidatePlaces()).hasSize(2);
//     }
// }
