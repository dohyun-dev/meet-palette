import ModalHeader from "../common/modal/ModalHeader.jsx";
import ModalContent from "../common/modal/ModalContent.jsx";
import FormControl from "../common/form/FormControl.jsx";
import TextField from "../common/form/TextField.jsx";
import ModalAction from "../common/modal/ModalAction.jsx";
import ModalButton from "../common/modal/ModalButton.jsx";
import Modal from "../common/modal/ModalLayout.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EnterGroupModal = () => {
  const navigate = useNavigate();

  const [inputGroupCode, setInputGroupCode] = useState("");

  const handleNextClick = () => {
    navigate(`/enter-group/${inputGroupCode}`);
  };

  const handleChange = (e) => {
    setInputGroupCode(e.currentTarget.value);
  };

  return (
    <Modal gap={30}>
      <ModalHeader
        title={"그룹 코드를 알려주세요!"}
        subTitle={"그룹 코드를 입력해주세요."}
      />
      <ModalContent>
        <FormControl>
          <TextField value={inputGroupCode} onChange={handleChange} />
        </FormControl>
      </ModalContent>
      <ModalAction>
        <ModalButton onClick={handleNextClick}>다음</ModalButton>
      </ModalAction>
    </Modal>
  );
};
export default EnterGroupModal;
