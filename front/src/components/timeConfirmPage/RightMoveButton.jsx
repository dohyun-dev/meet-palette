import { Button } from "./styles/MoveButton.styles.jsx";
import RightArrow from "../../assets/icons/right-arrow.svg";

const RightMoveButton = ({ type, onClick }) => {
  return (
    <Button onClick={onClick}>
      <img src={RightArrow} />
    </Button>
  );
};

export default RightMoveButton;
