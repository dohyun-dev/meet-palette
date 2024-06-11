import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Blank,
  Bottom,
  Date,
  DateWrapper,
  Select,
  SelectWrapper,
  Time,
  TimeWrapper,
  Top,
  DateHitMapWrapper,
  Wrapper,
} from "./styles/DateHitMap.styles.jsx";
import LeftMoveButton from "./LeftMoveButton.jsx";
import RightMoveButton from "./RightMoveButton.jsx";

// 주어진 날짜를 원하는 형식으로 포맷하는 함수
const getTableDateFormat = (date) => {
  const options = { month: "short", day: "numeric" };
  return new window.Date(date).toLocaleDateString("ko-KR", options);
};

// 현재 테이블 정보를 계산하는 함수
const getCurrentTableInfo = (availableDateTimes, timeRange) => {
  return availableDateTimes.map((dateTime) => {
    const availableTimeInfos = timeRange.map((time) => {
      const count = dateTime.times[time] || 0;
      return { time, count };
    });
    return { availableDate: dateTime.date, availableTimeInfos };
  });
};

// 시간 범위를 생성하는 함수
function getTimeRange() {
  return () => {
    const range = [];
    for (let i = 0; i < 24; i++) {
      range.push(i);
    }
    return range;
  };
}

// DateHitMap 컴포넌트
const DateHitMap = ({
  everyOneParticipation = false,
  availableTimes = [],
  participantsCount = 0,
  selectTime = "",
  setSelectTime,
}) => {
  const timeRange = useMemo(getTimeRange(), []);

  const [dates, setDates] = useState([]);

  const [data, setData] = useState([]);

  // 현재 표시되는 날짜의 인덱스를 상태로 관리합니다.
  const [currentIndex, setCurrentIndex] = useState(0);

  const TimeRows = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i * 2 + 2);
  }, []);

  // 좌측 이동 버튼 클릭 시 처리 함수
  const handleLeftMove = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 3)); // 좌측 이동 시 3칸씩 이동
  };

  // 우측 이동 버튼 클릭 시 처리 함수
  const handleRightMove = () => {
    setCurrentIndex(
      (prevIndex) => Math.min(dates.length - 3, prevIndex + 3), // 우측 이동 시 3칸씩 이동
    );
  };

  const handleSelectTime = (selectTime) => {
    if (!everyOneParticipation) return;
    setSelectTime(selectTime);
  };

  useEffect(() => {
    setDates(availableTimes.map((availableTime) => availableTime.date));
    setData(
      availableTimes.map((availableTime) => {
        const times = availableTime.countByHours.reduce((acc, cur) => {
          acc[cur.hour] = cur.count;
          return acc;
        }, {});
        return { date: availableTime.date, times };
      }),
    );
  }, [availableTimes]);

  // JSX 반환
  return (
    <Wrapper>
      {/* 좌측 이동 버튼 */}
      {currentIndex > 0 && <LeftMoveButton onClick={handleLeftMove} />}
      {/* 날짜 및 시간 표시 영역 */}
      <DateHitMapWrapper>
        {/* 상단 날짜 영역 */}
        <Top>
          <Blank />
          <DateWrapper>
            {/* 현재 표시되는 날짜 범위만큼만 반복하여 날짜를 표시합니다. */}
            {dates
              .slice(currentIndex, currentIndex + 3)
              .map((date) =>
                date.slice(currentIndex, currentIndex + 3) === "blank" ? (
                  <Date key={date}></Date>
                ) : (
                  <Date key={date}>{getTableDateFormat(date)}</Date>
                ),
              )}
          </DateWrapper>
        </Top>
        {/* 하단 시간 및 선택 영역 */}
        <Bottom>
          <TimeWrapper>
            {/* 시간을 표시합니다. */}
            {TimeRows.map((time) => (
              <Time key={time}>{time < 10 ? "0" + time : time}</Time>
            ))}
          </TimeWrapper>
          {/* 현재 표시되는 날짜 범위에 해당하는 데이터를 표시합니다. */}
          {data.slice(currentIndex, currentIndex + 3).map(({ date, times }) => (
            <SelectWrapper key={date}>
              {/* 시간별 선택 정보를 표시합니다. */}
              {timeRange.map((time) => (
                <Select
                  key={`${date} ${time}`}
                  $count={times[time] || 0}
                  $total={participantsCount}
                  $isSelect={
                    `${date}T${time < 10 ? "0" + time : time}:00:00` ===
                    selectTime
                  }
                  onClick={() =>
                    handleSelectTime(
                      `${date}T${time < 10 ? "0" + time : time}:00:00`,
                    )
                  }
                />
              ))}
            </SelectWrapper>
          ))}
        </Bottom>
      </DateHitMapWrapper>
      {/* 우측 이동 버튼 */}
      {currentIndex + 3 < dates.length && (
        <RightMoveButton onClick={handleRightMove} />
      )}
    </Wrapper>
  );
};

export default DateHitMap;
