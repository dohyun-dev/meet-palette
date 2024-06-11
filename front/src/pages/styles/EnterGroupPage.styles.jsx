import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  position: relative;

  gap: ${(props) => props.gap}px;
`;

export const TimePicksContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 163px;
  gap: 8px;

  overflow-y: scroll;
`;
