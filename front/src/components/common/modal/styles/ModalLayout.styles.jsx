import styled from "styled-components";

export const Wrap = styled.div`
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  position: absolute;
  bottom: 0px;
  backdrop-filter: blur(5px);
`;

export const ModalWrap = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap + "px" || 0};

  width: 100%;
  background-color: white;

  height: ${(props) => props.height || "auto"}px;
  border-radius: ${(props) => (props.height ? 0 : "24px 24px 0 0")};
`;
