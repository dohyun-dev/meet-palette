import { TimePicksContainer, Wrap } from "./styles/EnterGroupPage.styles.jsx";
import ModalHeader from "../components/common/modal/ModalHeader.jsx";
import ModalContent from "../components/common/modal/ModalContent.jsx";
import ModalAction from "../components/common/modal/ModalAction.jsx";
import ModalButton from "../components/common/modal/ModalButton.jsx";
import React, { useEffect, useState } from "react";
import TimeEnterButton from "../components/enterGroupPage/TimeEnterButton.jsx";
import TextBox from "../components/common/box/TextBox.jsx";
import XIcon from "../assets/icons/x.svg";
import CustomHorizontalCalendar from "../components/common/form/CustomHorizontalCalendar.jsx";
import TimeRangePicker from "../components/common/form/TimeRangePicker.jsx";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import PickPlaceModal from "../components/timeConfirmPage/PickPlaceModal.jsx";
import { useParams } from "react-router-dom";
import { findMeetingRequest } from "../apis/index.js";
import useEnterGroupStore from "../stores/useEnterGroupStore.js";
import DateUtil from "../utils/DateUtil.js";
import PhoneNumberInputModal from "../components/enterGroupPage/PhoneNumberInputModal.jsx";

const EnterGroupPage = () => {
  const { groupCode } = useParams();

  const {
    getEnterGroupFormData,
    getMeetingData,
    setMeetingData,
    setSelectMeetingPlace,
    setAvailableTimes,
  } = useEnterGroupStore();

  const [curPickDate, setCurPickDate] = useState(null);

  const [curPickDateTimeStart, setCurPickDateTimeStart] = useState(0);

  const [curPickDateTimeEnd, setCurPickDateTimeEnd] = useState(1);

  const [isVisiblePhoneNumberInputModal, setIsVisiblePhoneNumberInputModal] =
    useState(false);

  const [isVisiblePickPlaceModal, setIsVisiblePickPlaceModal] = useState(false);

  const candidatePlaces = getMeetingData().candidatePlaces;

  const handleClickRegister = () => {
    if (!curPickDate) {
      alert("선택해주세요");
      return;
    }
    const startTime = new Date(
      curPickDate.getFullYear(),
      curPickDate.getMonth(),
      curPickDate.getDate(),
      curPickDateTimeStart,
      0,
      0,
    );

    const endTime = new Date(
      curPickDate.getFullYear(),
      curPickDate.getMonth(),
      curPickDate.getDate(),
      curPickDateTimeEnd,
      0,
      0,
    );

    setAvailableTimes([
      ...getEnterGroupFormData().availableTimes,
      {
        startTime: DateUtil.dateToString(startTime),
        endTime: DateUtil.dateToString(endTime),
      },
    ]);
  };

  const handleClickPickDateTimeDelete = (idx) => {
    setAvailableTimes(getEnterGroupFormData().availableTimes.splice(idx, 1));
  };

  const handleClickNext = () => {
    setIsVisiblePhoneNumberInputModal(true);
  };

  const handleClickNextPhoneNumberInputModal = () => {
    setIsVisiblePhoneNumberInputModal(false);
    setIsVisiblePickPlaceModal(true);
  };

  useEffect(() => {
    findMeetingRequest(groupCode).then((response) => {
      setMeetingData(response);
    });
  }, [groupCode]);

  return (
    <Wrap gap={30}>
      <ModalHeader
        title={"되는 시간을 선택해주세요"}
        curStep={1}
        totalStep={3}
      />
      <ModalContent gap={30}>
        <CustomHorizontalCalendar
          selectStartDate={getMeetingData().meetingDateRangeStart}
          selectEndDate={getMeetingData().meetingDateRangeEnd}
          pickDate={curPickDate}
          setCurSelect={setCurPickDate}
        />
        <TimeRangePicker
          pickDateTimeStart={curPickDateTimeStart}
          setPickDateTimeStart={setCurPickDateTimeStart}
          pickDateTimeEnd={curPickDateTimeEnd}
          setPickDateTimeEnd={setCurPickDateTimeEnd}
        />
        <TimeEnterButton onClick={handleClickRegister}>
          등록하기
        </TimeEnterButton>
        <TimePicksContainer>
          {getEnterGroupFormData().availableTimes.map((item, idx) => (
            <TextBox
              key={idx}
              rightIcon={XIcon}
              onClickRightIcon={() => {
                handleClickPickDateTimeDelete(idx);
              }}
            >
              {`${format(item.startTime, "M월 dd일 (EEE) HH:mm", { locale: ko })} ~ ${format(item.endTime, "HH:mm", { locale: ko })}`}
            </TextBox>
          ))}
        </TimePicksContainer>
      </ModalContent>
      <ModalAction>
        <ModalButton onClick={handleClickNext}>다음</ModalButton>
      </ModalAction>

      {isVisiblePhoneNumberInputModal && (
        <PhoneNumberInputModal
          onClickNext={handleClickNextPhoneNumberInputModal}
        />
      )}

      {isVisiblePickPlaceModal && (
        <PickPlaceModal
          type={getMeetingData().placeCoordinationType}
          groupCode={groupCode}
          candidatePlaces={candidatePlaces}
          getEnterGroupFormData={getEnterGroupFormData}
          setSelectMeetingPlace={setSelectMeetingPlace}
        />
      )}
    </Wrap>
  );
};

export default EnterGroupPage;
