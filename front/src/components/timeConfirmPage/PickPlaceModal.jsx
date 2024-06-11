import ModalHeader from "../common/modal/ModalHeader.jsx";
import ModalContent from "../common/modal/ModalContent.jsx";
import ModalAction from "../common/modal/ModalAction.jsx";
import ModalButton from "../common/modal/ModalButton.jsx";
import Modal from "../common/modal/ModalLayout.jsx";
import { useEffect, useMemo, useState } from "react";
import TextBox from "../common/box/TextBox.jsx";
import Place from "../../assets/icons/place.png";
import { useNavigate } from "react-router-dom";
import SearchField from "../common/form/SearchField.jsx";
import { enterGroupRequest } from "../../apis/index.js";

const PickPlaceModal = ({
  type,
  groupCode,
  candidatePlaces,
  getEnterGroupFormData,
  setSelectMeetingPlace,
}) => {
  const [curSelectPlace, setCurSelectPlace] = useState(null);

  const navigate = useNavigate();

  const TYPE_MAP = useMemo(
    () => ({
      FIXED: {
        title: "여기에서 만나는게 맞나요?",
        subTitle: "그룹장이 설정한 위치를 확인해주세요!",
      },
      VOTE: {
        title: "만나고 싶은 위치에 투표하세요!",
        subTitle: "선택지 중에서 만나고 싶은 장소에 투표해주세요.",
      },
      CALC_MIDDLE_POSITION: {
        title: "가장 가까운 지하철역을 알려주세요!",
        subTitle: "중간 위치를 찾아드릴게요.",
      },
    }),
    [],
  );

  const handleClickNext = () => {
    setSelectMeetingPlace(curSelectPlace);

    enterGroupRequest(groupCode, getEnterGroupFormData()).then((response) => {
      navigate(`/time-confirm/${groupCode}`);
    });
  };

  const handleSelectPlace = (place, idx) => {
    setCurSelectPlace(place);
  };

  const handleSearchResultDelete = () => {
    setCurSelectPlace(null);
  };

  useEffect(() => {
    switch (type) {
      case "FIXED":
        setCurSelectPlace(candidatePlaces[0]);
        break;
      default:
        setCurSelectPlace(null);
        break;
    }
  }, [type]);

  const renderModalContent = () => {
    switch (type) {
      case "FIXED":
        return (
          <TextBox textAlign={"center"} rightIcon={Place}>
            {candidatePlaces[0].placeName}
          </TextBox>
        );
      case "VOTE":
        return candidatePlaces.map((place, index) => (
          <TextBox
            key={index}
            textAlign={"center"}
            rightIcon={Place}
            onClick={() => handleSelectPlace(place)}
            style={
              curSelectPlace === place
                ? { background: "var(--color-gray-1)", color: "white" }
                : {}
            }
          >
            {place.placeName}
          </TextBox>
        ));
      default:
        return (
          <SearchField
            value={curSelectPlace}
            onChange={handleSelectPlace}
            handleRemoveItem={handleSearchResultDelete}
          />
        );
    }
  };

  return (
    <Modal gap={24}>
      <ModalHeader
        title={TYPE_MAP[type].title}
        subTitle={TYPE_MAP[type].subTitle}
        curStep={2}
        totalStep={3}
      />
      <ModalContent gap={8}>{renderModalContent()}</ModalContent>
      <ModalAction>
        <ModalButton onClick={handleClickNext}>다음</ModalButton>
      </ModalAction>
    </Modal>
  );
};

export default PickPlaceModal;
