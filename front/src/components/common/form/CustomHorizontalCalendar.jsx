import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  DatesContainer,
  DateItem,
  Icon,
  MonthTextWrap,
  MonthWrap,
  Wrap,
  DateTextWrap,
} from "./styles/CustomHorizontalCalendar.styles.jsx";
import PrevIcon from "../../../assets/icons/calendarPrevMonth.svg";
import NextIcon from "../../../assets/icons/calendarNextMonth.svg";
import DateUtil from "../../../utils/DateUtil.js";

const CustomHorizontalCalendar = ({
  pickDate,
  setCurSelect,
  selectStartDate = new Date(),
  selectEndDate = new Date(),
}) => {
  const [curMonth, setCurMonth] = useState(null);
  const [dates, setDates] = useState([]);
  const datesContainerRef = useRef(null);

  useEffect(() => {
    const month = DateUtil.getMonth(selectStartDate);
    setCurMonth(month);
  }, []);

  useEffect(() => {
    if (curMonth) {
      const dates = DateUtil.getDatesInMonth(curMonth);
      setDates(dates);
    }
  }, [curMonth]);

  useEffect(() => {
    if (datesContainerRef.current && dates.length > 0) {
      const startDateIndex = dates.findIndex((date) => isDateRange(date));
      const endDateIndex = dates
        .slice()
        .reverse()
        .findIndex((date) => isDateRange(date));

      const startIndex = startDateIndex !== -1 ? startDateIndex : 0;
      const endIndex =
        endDateIndex !== -1
          ? dates.length - 1 - endDateIndex
          : dates.length - 1;

      const middleIndex = Math.floor((startIndex + endIndex) / 2);
      const middleElement = datesContainerRef.current.children[middleIndex];

      if (middleElement) {
        const containerWidth = datesContainerRef.current.offsetWidth;
        const middleElementLeft = middleElement.offsetLeft;
        const middleElementWidth = middleElement.offsetWidth;

        datesContainerRef.current.scrollLeft =
          middleElementLeft + middleElementWidth / 2 - containerWidth / 2;
      }
    }
  }, [dates]);

  const resetTime = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const isEqualsDate = (date1, date2) => {
    const resetDate1 = resetTime(date1);
    const resetDate2 = resetTime(date2);

    return resetDate1.getTime() === resetDate2.getTime();
  };

  const isDateSelectStart = (date) => {
    return isEqualsDate(date, selectStartDate);
  };

  const isDateSelectEnd = (date) => {
    return isEqualsDate(date, selectEndDate);
  };

  const isDateRange = (date) => {
    const dateWithoutTime = resetTime(date);
    const startDateWithoutTime = resetTime(selectStartDate);
    const endDateWithoutTime = resetTime(selectEndDate);

    return (
      dateWithoutTime >= startDateWithoutTime &&
      dateWithoutTime <= endDateWithoutTime
    );
  };

  const isCurSelect = (date) => {
    if (!pickDate) return false;
    return resetTime(pickDate).getTime() === resetTime(date).getTime();
  };

  const handleClickMonthPrev = () => {
    setCurMonth((cur) => {
      const prevDate = new Date(cur);
      prevDate.setMonth(prevDate.getMonth() - 1);
      return prevDate;
    });
  };

  const handleClickMonthNext = () => {
    setCurMonth((cur) => {
      const nextDate = new Date(cur);
      nextDate.setMonth(nextDate.getMonth() + 1);
      return nextDate;
    });
  };

  const handleClickDate = (date) => () => {
    if (!isDateRange(date)) {
      alert("범위 안에서 선택해주세요!");
      return;
    }
    setCurSelect(date);
  };

  return (
    <Wrap>
      <MonthWrap>
        <Button onClick={handleClickMonthPrev}>
          <Icon src={PrevIcon} />
        </Button>
        <MonthTextWrap>
          {curMonth ? DateUtil.formatMonthYear(curMonth) : ""}
        </MonthTextWrap>
        <Button onClick={handleClickMonthNext}>
          <Icon src={NextIcon} />
        </Button>
      </MonthWrap>

      <DatesContainer ref={datesContainerRef}>
        {dates &&
          dates.map((date) => (
            <DateItem
              key={date}
              className={`
                ${isDateSelectStart(date) ? "date-select-start" : ""}
                ${isDateSelectEnd(date) ? "date-select-end" : ""}
                ${isDateRange(date) ? "date-range" : ""}
                ${isCurSelect(date) ? "cur-select" : ""}
              `.trim()}
              text={DateUtil.formatDay(date)}
              onClick={handleClickDate(date)}
            >
              <DateTextWrap
                $isCurSelect={isCurSelect(date)}
                $isDateSelectStart={isDateSelectStart(date)}
                $isDateSelectEnd={isDateSelectEnd(date)}
              >
                {DateUtil.formatDay(date)}
              </DateTextWrap>
            </DateItem>
          ))}
      </DatesContainer>
    </Wrap>
  );
};

export default CustomHorizontalCalendar;
