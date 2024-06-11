import ModalHeader from "../common/modal/ModalHeader.jsx";
import ModalContent from "../common/modal/ModalContent.jsx";
import ModalAction from "../common/modal/ModalAction.jsx";
import ModalButton from "../common/modal/ModalButton.jsx";
import Modal from "../common/modal/ModalLayout.jsx";
import TextField from "../common/form/TextField.jsx";
import { useState } from "react";
import useEnterGroupStore from "../../stores/useEnterGroupStore.js";
import FormControl from "../common/form/FormControl.jsx";

const PhoneNumberInputModal = ({ onClickNext }) => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");

  const { setPhoneNumber } = useEnterGroupStore();

  const handleChange = (e) => {
    setInputPhoneNumber(e.currentTarget.value);
  };

  const handleClickNext = () => {
    setPhoneNumber(inputPhoneNumber);
    onClickNext();
  };

  return (
    <Modal gap={24}>
      <ModalHeader
        title={"전화번호를 입력해주세요!"}
        subTitle={"약속 확정시 알림을 보내드릴게요!"}
      />
      <ModalContent gap={8}>
        <FormControl>
          <TextField
            placeHolder={"(선택) 입력하기"}
            value={inputPhoneNumber}
            onChange={handleChange}
          />
        </FormControl>
      </ModalContent>
      <ModalAction>
        <ModalButton onClick={handleClickNext}>다음</ModalButton>
      </ModalAction>
    </Modal>
  );
};

export default PhoneNumberInputModal;
