import { SelectOption } from "./styles/Select.styles.jsx";
import { useState } from "react";

const Option = ({ value, children, isPicked, onClick }) => {
  return (
    <SelectOption value={value} isPicked={isPicked} onClick={onClick}>
      {children}
    </SelectOption>
  );
};

const SelectForm = ({ onChange, isPicked }) => {
  const [selectOptions, setSelectOptions] = useState([
    ["위치가 정해져있어요", "FIXED"],
    ["투표로 결정할래요", "VOTE"],
    ["중간 위치를 찾아주세요", "CALC_MIDDLE_POSITION"],
  ]);

  const handleOptionClick = (value) => () => {
    onChange(value);
  };

  return selectOptions.map((option, idx) => (
    <Option
      key={idx}
      isPicked={option[1] === isPicked}
      onClick={handleOptionClick(option[1])}
      value={option[1]}
    >
      {option[0]}
    </Option>
  ));
};

export default SelectForm;
