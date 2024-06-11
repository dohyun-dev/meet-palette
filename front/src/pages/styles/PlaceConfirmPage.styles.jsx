import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  gap: ${(props) => (props.gap ? props.gap + "px" : "0px")};
`;

export const CloseIcon = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;

  cursor: pointer;
`;
