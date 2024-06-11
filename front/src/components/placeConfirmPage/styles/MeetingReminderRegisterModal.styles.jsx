import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);

  gap: ${(props) => (props.gap ? props.gap + "px" : "0px")};
`;

export const CloseIcon = styled.img`
  position: absolute;
  top: ${(props) => props.$top || 15}px;
  right: ${(props) => props.$right || 15}px;

  cursor: pointer;
`;
