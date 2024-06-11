import { Button, Plus } from "./styles/AddButton.styles.jsx";
import PlusIcon from "../../../assets/icons/plus2.svg";

const AddButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Plus src={PlusIcon} />
      추가하기..
    </Button>
  );
};

export default AddButton;
