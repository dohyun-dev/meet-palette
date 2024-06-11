import styled, { css } from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// 캘린더를 중앙에 배치하는 Wrapper 컴포넌트
export const Wrap = styled.div`
  margin: 0 auto;
  position: relative;
`;

// 스타일이 적용된 캘린더 컴포넌트
export const StyledCalendar = styled(Calendar)`
  font-family: inherit;
  width: 300px;
  border: none !important;

  .react-calendar__navigation {
    justify-content: center;
    margin-bottom: 0.3rem !important;

    // 두 달 앞뒤로 이동하는 버튼 숨기기
    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
      display: none;
    }
  }

  .react-calendar__navigation__arrow {
    font-size: 30px;
    line-height: 30px;
    font-weight: 600;
    color: var(--color-gray-1);
  }

  .react-calendar__navigation__label {
    flex-grow: 0 !important;

    &:focus,
    &:active,
    &:hover {
      background: inherit !important;
    }
  }

  .react-calendar__navigation__label__labelText {
    font-family: Jua !important;
    font-size: 20px;
    line-height: 20px;
    font-weight: 600;
    color: black;
  }

  .react-calendar__month-view__weekdays__weekday {
    font-weight: 400;
    color: #757575;

    // 일요일 빨간색, 토요일 파란색으로 표시
    &:first-child {
      color: #ff0000;
    }

    &:last-child {
      color: #4d81f6;
    }
  }

  // 요일 약어의 대문자 변환 해제
  .react-calendar__month-view__weekdays__weekday abbr {
    text-transform: none;
  }

  .react-calendar__viewContainer {
    border: 2px solid var(--main-light-pink1);
    border-radius: 10px;
    padding: 10px 20px;
    color: black;
  }

  .react-calendar__tile {
    background: none;
    text-align: center;
    position: relative;

    // 타일에 호버 또는 포커스 시 강조
    &:enabled {
      &:focus {
        background: var(--main-hot-pink);
        border-radius: 50%;
        color: inherit;
      }
    }

    &:hover {
      background: none !important;
    }
  }

  .react-calendar__month-view__days__day {
    color: black;
  }

  // 인접한 월의 날이 아닌 주말의 색상 설정
  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(0, 0, 0, 0.3);
  }

  // 활성화된 날짜 타일의 스타일
  .react-calendar__tile--active {
    background: var(--main-hot-pink);
    border-radius: 50%;
    color: inherit;
  }

  .react-calendar__tile:enabled:hover {
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background-color: var(--main-hot-pink);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    & > * {
      position: relative;
      z-index: 2;
    }
  }

  // 범위 시작 및 끝 타일의 스타일
  .react-calendar__tile--rangeStart:not(
      .react-calendar__year-view__months__month
    ),
  .react-calendar__tile--rangeEnd:not(
      .react-calendar__year-view__months__month
    ) {
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background-color: var(--main-hot-pink);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    & > * {
      position: relative;
      z-index: 2;
    }
  }

  // 범위 시작, 끝 및 양 끝 타일의 특정 border-radius 설정
  .react-calendar__tile--rangeStart {
    border-radius: 50% 0 0 50% !important;
  }

  .react-calendar__tile--rangeEnd {
    border-radius: 0 50% 50% 0 !important;
  }

  .react-calendar__tile--rangeBothEnds {
    border-radius: 50% !important;
  }

  // 범위 내 타일의 스타일
  .react-calendar__tile--range:not(.react-calendar__year-view__months__month) {
    position: relative;
    background: var(--main-light-pink1) !important;
    border-radius: 0;
  }

  // 범위 시작 및 끝 타일의 배경과 border-radius 재정의
  .react-calendar__tile--rangeStart:not(
      .react-calendar__year-view__months__month
    ),
  .react-calendar__tile--rangeEnd:not(
      .react-calendar__year-view__months__month
    ) {
    background: var(--main-hot-pink);
    border-radius: 50%;
    color: inherit;
  }

  // 현재 날짜 타일과 활성 타일의 스타일 재정의
  .react-calendar__tile--now,
  .react-calendar__tile--active {
    background: none;
    color: inherit;
  }

  // 요일 약어의 밑줄 제거
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }

  ${({ isHorizontal }) =>
    isHorizontal &&
    css`
      .react-calendar__viewContainer {
        padding: 0;
        border: none;
        overflow: hidden;
      }

      .react-calendar__month-view__weekdays {
        display: none !important;
      }

      .react-calendar__month-view__days {
        flex-wrap: nowrap !important;
      }
    `}
`;
