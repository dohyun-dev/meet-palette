import ModalHeader from "../common/modal/ModalHeader.jsx";
import ModalContent from "../common/modal/ModalContent.jsx";
import FormControl from "../common/form/FormControl.jsx";
import InputLabel from "../common/form/InputLabel.jsx";
import ModalAction from "../common/modal/ModalAction.jsx";
import ModalButton from "../common/modal/ModalButton.jsx";
import Modal from "../common/modal/ModalLayout.jsx";
import { useMemo } from "react";
import AddButton from "../common/button/AddButon.jsx";
import SearchField from "../common/form/SearchField.jsx";

const PlaceConfirmModal = ({
  pickCoordinationType,
  candidatePlaces,
  setCandidatePlaces,
  onSubmit,
}) => {
  const MULTI_INPUT_TYPE = useMemo(() => "VOTE", []);

  const typeMap = useMemo(
    () => ({
      FIXED: {
        title: "정해진 장소를 알려주세요",
        label: "정해진 장소를 입력해주세요",
      },
      VOTE: {
        title: "투표할 위치를 알려주세요.",
        label: "인근 지하철 역을 입력해주세요",
      },
      CALC_MIDDLE_POSITION: {
        title: "본인 위치를 알려주세요.",
        label: "인근 지하철 역을 입력해주세요.",
      },
    }),
    [],
  );

  const handleClickAddTextField = () => {
    setCandidatePlaces([...candidatePlaces, null]);
  };

  const handleChange = (value, key) => {
    setCandidatePlaces(
      candidatePlaces.map((place, idx) => (idx == key ? value : place)),
    );
  };

  const handleRemoveItem = (removeIdx) => {
    setCandidatePlaces(
      candidatePlaces.filter((place, idx) => idx !== removeIdx),
    );
  };

  return (
    <Modal gap={15}>
      <ModalHeader
        title={typeMap[pickCoordinationType].title}
        curStep={2}
        totalStep={2}
      />
      <ModalContent gap={15}>
        <FormControl>
          <InputLabel>{typeMap[pickCoordinationType].label}</InputLabel>
          {candidatePlaces.map((place, idx) => (
            <SearchField
              idx={idx}
              key={idx}
              value={place}
              placeHolder={"검색하기"}
              onChange={handleChange}
              handleRemoveItem={() => handleRemoveItem(idx)}
            />
          ))}
          {pickCoordinationType == MULTI_INPUT_TYPE && (
            <AddButton onClick={handleClickAddTextField} />
          )}
        </FormControl>
      </ModalContent>
      <ModalAction>
        <ModalButton onClick={onSubmit}>URL 생성하기</ModalButton>
      </ModalAction>
    </Modal>
  );
};

export default PlaceConfirmModal;
