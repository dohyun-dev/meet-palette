import { ModalWrap, Wrap } from "./styles/ModalLayout.styles.jsx";

const Modal = ({ children, gap, height }) => {
  return (
    <Wrap>
      <ModalWrap height={height} gap={gap}>
        {children}
      </ModalWrap>
    </Wrap>
  );
};

export default Modal;
