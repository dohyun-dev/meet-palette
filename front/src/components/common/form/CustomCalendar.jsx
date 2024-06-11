import React, { useCallback, useState } from "react";
import { StyledCalendar } from "./styles/CustomCalendar.styles.jsx";

const CustomCalendar = ({ dateRange, setDateRange }) => {
  const [view, setView] = useState("month"); // 현재 뷰를 관리하기 위한 상태 추가

  const formatDay = useCallback((locale, date) => {
    const day = date.getDate();
    return day.toLocaleString("ko-KR", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }, []);

  const formatShortWeekday = useCallback((locale, date) => {
    const weekday = date.toLocaleDateString("en", { weekday: "short" });
    return weekday;
  }, []);

  const formatMonthYear = useCallback((locale, date) => {
    const month = date.toLocaleDateString("ko-KR", { month: "long" });
    const year = date.getFullYear();
    return `${year}년 ${month}`;
  }, []);

  const onChange = (range) => {
    setDateRange(range);
  };

  const onActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view !== "month") {
      setView("month"); // 뷰가 'month'가 아닌 경우 강제로 'month'로 변경
    }
  };

  return (
    <StyledCalendar
      onChange={onChange}
      selectRange={true}
      value={dateRange}
      formatDay={formatDay}
      formatShortWeekday={formatShortWeekday}
      formatMonthYear={formatMonthYear}
      locale="ko-KR"
      view="month" // 현재 뷰 설정
      onActiveStartDateChange={onActiveStartDateChange} // 뷰 변경 시 이벤트 핸들러 추가
      calendarType="gregory"
      prev2Label={null}
      next2Label={null}
    />
  );
};

export default CustomCalendar;
