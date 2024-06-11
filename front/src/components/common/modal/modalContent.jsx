import { Wrap } from "./styles/modalContent.styles.jsx";

const ModalContent = ({ children, gap }) => {
  return <Wrap $gap={gap}>{children}</Wrap>;
};

export default ModalContent;
