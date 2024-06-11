import PlaceMock from "../../mocks/PlacesMock.js";
import Modal from "../common/modal/ModalLayout.jsx";
import ModalHeader from "../common/modal/ModalHeader.jsx";
import CategoryContainer from "./CategoryContainer.jsx";
import PlaceContainer from "./PlaceContainer.jsx";
import { CloseIcon } from "../../pages/styles/PlaceConfirmPage.styles.jsx";
import XIcon from "@assets/icons/x.svg";

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // 남아 있는 요소가 없을 때까지 반복합니다.
  while (0 !== currentIndex) {
    // 남은 요소 중 하나를 선택합니다.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // 현재 요소와 선택한 요소를 교환합니다.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const RecommendPlaceModal = ({ place = "홍대입구역", onClickClose }) => {
  const data = shuffle(PlaceMock);

  const [selectCategory, setSelectCategory] = useState(null);

  return (
    <Modal gap={24} height={600}>
      <ModalHeader
        title={`${place.split(" ")[0]} 추천 장소를 알려드릴게요! `}
        subTitle={"약속 목적을 선택해주세요"}
      />
      <CategoryContainer
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      <PlaceContainer data={data} />
      <CloseIcon src={XIcon} onClick={onClickClose} />
    </Modal>
  );
};

export default RecommendPlaceModal;
