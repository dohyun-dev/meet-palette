import { Input } from "./styles/TextField.styles.jsx";

const TextField = ({ name, value, onChange, placeHolder = "입력하기" }) => {
  return (
    <Input
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
    />
  );
};

export default TextField;
