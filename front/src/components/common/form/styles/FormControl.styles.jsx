import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || 15}px;

  margin-bottom: ${(props) => props.$mb || 0}px;
`;
