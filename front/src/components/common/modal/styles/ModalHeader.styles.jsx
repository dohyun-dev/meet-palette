import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  text-align: ${(props) => (props.$textAlign ? props.$textAlign : "left")};

  margin: 20px 24px 0px 32px;
`;

export const ModalTitle = styled.h3.withConfig({
  shouldForwardProp: (props) => props !== "hasNewLine",
})`
  font-family: Jua;

  font-size: 22px;
  line-height: ${(props) => (props.hasNewLine ? "30px" : "23px")};
  letter-spacing: -0.5px;

  white-space: pre-wrap;
`;

export const ModalSubTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--color-gray-1);
`;

export const Step = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
`;
