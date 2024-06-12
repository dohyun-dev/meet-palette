package com.kwon.backend.meeting.adaptor.in.api;

import com.kwon.backend.meeting.adaptor.in.dto.MeetingRequest;
import com.kwon.backend.meeting.adaptor.in.dto.MeetingResponse;
import com.kwon.backend.meeting.adaptor.in.dto.MeetingResponseDto;
import com.kwon.backend.meeting.adaptor.in.dto.PlaceDto;
import com.kwon.backend.meeting.application.dto.MeetingDto;
import com.kwon.backend.meeting.application.dto.TimeConfirmDto;
import com.kwon.backend.meeting.application.port.in.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/meetings")
public class MeetingApiControllerV1 {

    private final ModelMapper mapper;
    private final CreateMeetingUseCase createMeetingUseCase;
    private final EnterGroupUseCase enterGroupUseCase;
    private final FindMeetingUseCase findMeetingUseCase;
    private final FindSubwayUseCase findSubwayUseCase;
    private final FindTimeConfirmsUseCase findTimeConfirmsUseCase;
    private final ConfirmMeetingUseCase confirmMeetingUseCase;
    private final MeetingReminderUseCase meetingReminderUseCase;

    @PostMapping
    public ResponseEntity<MeetingResponse.Create> create(@RequestBody MeetingRequest.Create request) {
        String groupCode = createMeetingUseCase.create(mapper.map(request, MeetingDto.CreateCommand.class));
        return ResponseEntity.ok(new MeetingResponse.Create(groupCode));
    }

    @PostMapping("/{groupCode}/enter-group")
    public void enterGroup(@PathVariable("groupCode") Long groupCode, @RequestBody MeetingRequest.EnterGroup request) {
        enterGroupUseCase.enter(groupCode, mapper.map(request, MeetingDto.EnterGroupCommand.class));
    }

    @PostMapping("/{groupCode}/confirm-group")
    public void confirmMeeting(@PathVariable("groupCode") Long groupCode, @RequestBody MeetingRequest.ConfirmMeeting request) {
        confirmMeetingUseCase.confirm(groupCode, request.getConfirmDateTime());
    }

    @GetMapping("/{groupCode}")
    public MeetingResponseDto findMeeting(@PathVariable("groupCode") Long groupCode) {
        return new MeetingResponseDto(findMeetingUseCase.find(groupCode));
    }

    @GetMapping("/{groupCode}/time-confirms")
    public TimeConfirmDto findTimeConfirms(@PathVariable("groupCode") Long groupCode) {
        return findTimeConfirmsUseCase.find(groupCode);
    }

    @PostMapping("/{groupCode}/reminder")
    public void reminder(
            @PathVariable("groupCode") Long groupCode,
            @RequestBody MeetingRequest.Reminder reminder
    ) {
        meetingReminderUseCase.reminder(groupCode, reminder.getPhoneNumber());
    }

    @GetMapping("/find-subway")
    public List<PlaceDto> findSubway(String subwayName) {
        return findSubwayUseCase.find(subwayName)
                .stream()
                .map(p -> new PlaceDto(p))
                .toList();
    }
}
