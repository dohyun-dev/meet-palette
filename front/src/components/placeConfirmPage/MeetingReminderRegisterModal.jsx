import React, { useState } from "react";
import { reminderMeetingRequest } from "../../apis/index.js";
import ModalHeader from "../common/modal/ModalHeader.jsx";
import ModalContent from "../common/modal/ModalContent.jsx";
import FormControl from "../common/form/FormControl.jsx";
import TextField from "../common/form/TextField.jsx";
import ModalAction from "../common/modal/ModalAction.jsx";
import ModalButton from "../common/modal/ModalButton.jsx";
import XIcon from "../../assets/icons/x.svg";
import Modal from "../common/modal/ModalLayout.jsx";
import { CloseIcon } from "./styles/MeetingReminderRegisterModal.styles.jsx";

const MeetingReminderRegisterModal = ({ groupCode, onClickClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isSuccessRequest, setIsSuccessRequest] = useState(false);

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.currentTarget.value);
  };

  const handleClickRegister = () => {
    reminderMeetingRequest(groupCode, phoneNumber)
      .then((response) => setIsSuccessRequest(true))
      .catch((error) => console.error(error));
  };

  return (
    <Modal gap={24}>
      {!isSuccessRequest ? (
        <>
          <ModalHeader
            title={"전화번호를 입력해주세요!"}
            subTitle={"메시지 전송을 위해 전화번호를 입력해주세요!"}
          />
          <ModalContent gap={8}>
            <FormControl>
              <TextField
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
              />
            </FormControl>
          </ModalContent>
          <ModalAction>
            <ModalButton onClick={handleClickRegister}>다음</ModalButton>
          </ModalAction>
          <CloseIcon $top={30} $right={30} src={XIcon} onClick={onClickClose} />
        </>
      ) : (
        <>
          <ModalHeader
            title={"알림 설정이 완료되었습니다🎉"}
            subTitle={"약속 3일 전에 알림을 보내드릴게요!"}
            textAlign={"center"}
          />
          <ModalAction>
            <ModalButton onClick={onClickClose}>완료</ModalButton>
          </ModalAction>
        </>
      )}
    </Modal>
  );
};

export default MeetingReminderRegisterModal;
