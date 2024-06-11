import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

export const MonthWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const MonthTextWrap = styled.div`
  display: inline-flex;
  align-items: center;

  font-family: Jua;
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background: none;
`;

export const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

export const DatesContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: center;

  margin-top: 24px;
`;

export const DateItem = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.date-range {
    background: var(--main-light-pink1);
  }

  &.date-select-start {
    border-radius: 50% 0 0 50%;
  }

  &.date-select-end {
    border-radius: 0 50% 50% 0;
  }

  &.date-select-start.date-select-end {
    border-radius: 50%;
  }
`;

export const DateTextWrap = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 10px;

  background: ${(props) =>
    props.$isCurSelect
      ? "orange"
      : props.$isDateSelectStart || props.$isDateSelectEnd
        ? "var(--main-hot-pink)"
        : "none"};

  border-radius: 50%;
  color: ${(props) =>
    props.$isCurSelect || props.$isDateSelectStart || props.$isDateSelectEnd
      ? "black"
      : "rgba(0, 0, 0, 0.7)"};
`;
