import { Wrap } from "./styles/CreateMeetingPage.styles.jsx";
import ModalHeader from "../components/common/modal/ModalHeader.jsx";
import ModalContent from "../components/common/modal/ModalContent.jsx";
import FormControl from "../components/common/form/FormControl.jsx";
import ModalAction from "../components/common/modal/ModalAction.jsx";
import ModalButton from "../components/common/modal/ModalButton.jsx";
import InputLabel from "../components/common/form/InputLabel.jsx";
import { useEffect, useState } from "react";
import Calendar from "../components/common/form/CustomCalendar.jsx";
import SelectForm from "../components/common/form/Select.jsx";
import CreateGroupResultModal from "../components/createMeetingPage/CreateGroupResultModal.jsx";
import PlaceConfirmModal from "../components/createMeetingPage/PlaceConfirmModal.jsx";
import useCreateMeetingStore from "../stores/useCreateMeetingStore.js";
import { ENTER_GROUP_PATH } from "../constants/urls.js";
import { createMeetingRequest } from "../apis/index.js";
import { useNavigate } from "react-router-dom";
import DateUtil from "../utils/DateUtil.js";

const CreateMeetingPage = () => {
  const navigate = useNavigate();

  const [pickPlaceCoordinationType, setPickPlaceCoordinationType] =
    useState(null);

  const [meetingDateRange, setMeetingDateRange] = useState([null, null]);

  const [pickPlaces, setPickPlaces] = useState([null]);

  const {
    getCreateMeetingFormData,
    setMeetingDateRangeStart,
    setMeetingDateRangeEnd,
    setPlaceCoordinationType,
    setCandidatePlaces,
  } = useCreateMeetingStore();

  const { meetingName, meetingParticipantsCount } = getCreateMeetingFormData();

  const [isVisiblePlaceConfirmModal, setIsVisiblePlaceConfirmModal] =
    useState(false);

  const [isVisibleCreateGroupResultModal, setIsVisibleCreateGroupResultModal] =
    useState(false);

  const [createMeetingGroupCode, setCreateMeetingGroupCode] = useState(null);

  const setStore = () => {
    const startDate = meetingDateRange[0];
    const endDate = meetingDateRange[1];
    setMeetingDateRangeStart(
      startDate <= endDate
        ? DateUtil.dateToString(startDate)
        : DateUtil.dateToString(endDate),
    );
    setMeetingDateRangeEnd(
      startDate >= endDate
        ? DateUtil.dateToString(startDate)
        : DateUtil.dateToString(endDate),
    );
    setPlaceCoordinationType(pickPlaceCoordinationType);
    setCandidatePlaces(pickPlaces.filter((place) => place !== null));

    console.log(getCreateMeetingFormData);
  };

  const handleClickNext = () => {
    if (pickPlaceCoordinationType == "CALC_MIDDLE_POSITION") {
      handleSubmit();
      return;
    }
    setIsVisiblePlaceConfirmModal(true);
  };

  const handleSubmit = () => {
    setStore();
    createMeetingRequest(getCreateMeetingFormData()).then((response) => {
      setCreateMeetingGroupCode(response.groupCode);
      setIsVisiblePlaceConfirmModal(false);
      setIsVisibleCreateGroupResultModal(true);
    });
  };

  useEffect(() => {
    if (!meetingName || !meetingParticipantsCount) {
      navigate("/");
    }
  }, [meetingName, meetingParticipantsCount]);

  return (
    <Wrap>
      <ModalHeader
        title={"약속 정보를 설정해주세요"}
        subTitle={"약속 기간을 설정해주세요"}
        curStep={1}
        totalStep={2}
      />
      <ModalContent>
        <Calendar
          dateRange={meetingDateRange}
          setDateRange={setMeetingDateRange}
        />
        <FormControl mb={10} gap={10}>
          <InputLabel>장소 설정 방식을 설정해주세요</InputLabel>
          <SelectForm
            onChange={setPickPlaceCoordinationType}
            isPicked={pickPlaceCoordinationType}
          />
        </FormControl>
      </ModalContent>
      <ModalAction>
        <ModalButton onClick={handleClickNext}>다음</ModalButton>
      </ModalAction>
      {isVisiblePlaceConfirmModal && (
        <PlaceConfirmModal
          pickCoordinationType={pickPlaceCoordinationType}
          candidatePlaces={pickPlaces}
          setCandidatePlaces={setPickPlaces}
          onSubmit={handleSubmit}
        />
      )}
      {createMeetingGroupCode && isVisibleCreateGroupResultModal && (
        <CreateGroupResultModal
          result={{
            groupCode: createMeetingGroupCode,
            groupUrl: ENTER_GROUP_PATH(createMeetingGroupCode),
          }}
        />
      )}
    </Wrap>
  );
};

export default CreateMeetingPage;
