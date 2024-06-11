import ModalHeader from "../common/modal/ModalHeader.jsx";
import ModalContent from "../common/modal/ModalContent.jsx";
import FormControl from "../common/form/FormControl.jsx";
import InputLabel from "../common/form/InputLabel.jsx";
import TextField from "../common/form/TextField.jsx";
import NumberField from "../common/form/NumberField.jsx";
import ModalAction from "../common/modal/ModalAction.jsx";
import ModalButton from "../common/modal/ModalButton.jsx";
import Modal from "../common/modal/ModalLayout.jsx";
import { useNavigate } from "react-router-dom";
import useCreateMeetingStore from "../../stores/useCreateMeetingStore.js";
import { useState } from "react";

const CreateGroupModal = () => {
  const [formData, setFormData] = useState({
    meetingName: "",
    groupLeaderPhoneNumber: "",
    meetingParticipantsCount: 1,
  });

  const navigate = useNavigate();

  const { setMeetingName, setMeetingParticipantsCount } =
    useCreateMeetingStore();

  const handleChangeFormData = (e) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleChangeMeetingParticipantsCount = (count) => {
    setFormData({
      ...formData,
      meetingParticipantsCount: count,
    });
  };

  const handleNextClick = () => {
    setMeetingName(formData.meetingName);
    setMeetingParticipantsCount(formData.meetingParticipantsCount);
    navigate("/create-meeting");
  };

  return (
    <Modal gap={30}>
      <ModalHeader title={"약속 정보를 입력해주세요"} />
      <ModalContent gap={15}>
        <FormControl>
          <InputLabel>약속 이름을 입력해주세요</InputLabel>
          <TextField
            name="meetingName"
            value={formData.meetingName}
            onChange={handleChangeFormData}
          />
        </FormControl>
        <FormControl>
          <InputLabel>약속 참여 인원을 설정해주세요</InputLabel>
          <NumberField
            value={formData.meetingParticipantsCount}
            onChange={handleChangeMeetingParticipantsCount}
          />
        </FormControl>
      </ModalContent>
      <ModalAction>
        <ModalButton onClick={handleNextClick}>다음</ModalButton>
      </ModalAction>
    </Modal>
  );
};
export default CreateGroupModal;
