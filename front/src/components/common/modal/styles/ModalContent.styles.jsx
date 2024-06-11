import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.$gap || 0}px;
  margin: 0px 45px 0px 45px;

  @media (max-width: 600px) {
    /* 작은 화면에 대한 스타일 */
    gap: 15px;
  }
`;
