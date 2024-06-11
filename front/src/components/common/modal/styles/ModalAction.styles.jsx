import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${(props) => props.gap | 0}px;

  margin: 10px 45px 30px 45px;

  margin-top: ${(props) => props.$mt || 0}px;
  margin-bottom: ${(props) => props.$mb || 0}px;
`;
