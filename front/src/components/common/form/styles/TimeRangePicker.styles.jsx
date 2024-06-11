// styles.jsx
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;

  height: 150px;
`;

export const OverRay = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const OverRayItem = styled.div`
  width: 100%;
  height: 50px;
  background: ${(props) => (props.$isSelect ? "var(--color-gray-2)" : "none")};
  border-radius: 15px;
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  width: 80%;

  padding: 0 32px;

  .swiper-slide {
    height: 50px !important;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.25);
  }

  .swiper-slide-active {
    color: black !important;
  }
`;

export const TimeTextWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  z-index: 1;
`;

export const TimeItem = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const TextWrap = styled.div`
  display: inline-flex;
  align-items: center;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;

  margin-left: 5px;
`;
