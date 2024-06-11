import styled from "styled-components";

export const Box = styled.div`
  position: relative;

  display: flex;
  justify-content: ${(props) => props.$textAlign || "left"};
  align-items: center;

  background: var(--color-gray-2);

  width: 100%;
  height: 50px;
  border-radius: 10px;

  padding: 15px 20px;

  color: black;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;

  font-family: ${(props) => props.$fontFamily || "Inter"};
`;

export const LeftIcon = styled.img`
  position: absolute;
  left: 15px;
`;

export const RightIcon = styled.img`
  position: absolute;
  right: 15px;
`;
