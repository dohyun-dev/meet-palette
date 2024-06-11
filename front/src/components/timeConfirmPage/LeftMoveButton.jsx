import { Button } from "./styles/MoveButton.styles.jsx";
import LeftArrow from "../../assets/icons/left-arrow.svg";

const LeftMoveButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <img src={LeftArrow} />
    </Button>
  );
};

export default LeftMoveButton;
