import { Wrap } from "./styles/ModalContent.styles.jsx";

const ModalContent = ({ children, gap }) => {
  return <Wrap $gap={gap}>{children}</Wrap>;
};

export default ModalContent;
