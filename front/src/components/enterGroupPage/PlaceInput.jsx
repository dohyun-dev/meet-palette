import { CustomInput, InputWrap } from "./styles/PlaceInput.styles.jsx";
import { RightIcon } from "../common/box/styles/TextBox.styles.jsx";
import Place from "../../assets/icons/place.png";

const PlaceInput = ({ value, onChange }) => {
  return (
    <InputWrap>
      <CustomInput value={value} placeholder={"입력하기"} onChange={onChange} />
      <RightIcon src={Place} />
    </InputWrap>
  );
};

export default PlaceInput;
