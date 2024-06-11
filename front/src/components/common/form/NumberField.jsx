import {
  Button,
  InputWrap,
  NumberDisplay,
} from "./styles/NumberField.styles.jsx";
import Plus from "../../../assets/icons/plus.svg";
import Minus from "../../../assets/icons/minus.svg";

const NumberField = ({ value = 1, onChange }) => {
  const handleClickMinus = () => {
    onChange(value === 1 ? value : value - 1);
  };

  const handleClickPlus = () => {
    onChange(value + 1);
  };

  return (
    <InputWrap>
      <Button onClick={handleClickMinus}>
        <img src={Minus} />
      </Button>
      <NumberDisplay>{value}</NumberDisplay>
      <Button onClick={handleClickPlus}>
        <img src={Plus} />
      </Button>
    </InputWrap>
  );
};

export default NumberField;
