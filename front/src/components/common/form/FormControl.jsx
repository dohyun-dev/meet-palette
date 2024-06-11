import { Wrap } from "./styles/FormControl.styles.jsx";

const FormControl = ({ children, mb, gap }) => {
  return (
    <Wrap $mb={mb} $gap={gap}>
      {children}
    </Wrap>
  );
};

export default FormControl;
