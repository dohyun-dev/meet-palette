import React, { useEffect, useState } from "react";
import {
  Container,
  OverRay,
  OverRayItem,
  TextWrap,
  TimeContainer,
  TimeItem,
  TimeTextWrap,
} from "./styles/TimeRangePicker.styles.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const generateTimeOptions = (start, end) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    options.push(i.toString().padStart(2, "0") + ":00");
  }
  return options;
};

const TimeRangePicker = ({
  pickDateTimeStart,
  setPickDateTimeStart,
  pickDateTimeEnd,
  setPickDateTimeEnd,
}) => {
  const startTimeOptions = generateTimeOptions(0, 23);
  const endTimeOptions = generateTimeOptions(1, 24);

  const handleStartTimeChange = (swiper) => {
    setPickDateTimeStart(swiper.activeIndex);
  };

  const handleEndTimeChange = (swiper) => {
    setPickDateTimeEnd(swiper.activeIndex + 1);
  };

  return (
    <Container>
      <OverRay>
        <OverRayItem />
        <OverRayItem $isSelect={true} />
        <OverRayItem />
      </OverRay>

      <TimeContainer>
        <TimeTextWrap>
          <Swiper
            direction="vertical"
            slidesPerView={3}
            centeredSlides={true}
            onSlideChange={handleStartTimeChange}
          >
            {startTimeOptions.map((time, index) => (
              <SwiperSlide key={index}>
                <TimeItem>{time}</TimeItem>
              </SwiperSlide>
            ))}
          </Swiper>
          <TextWrap>부터</TextWrap>
        </TimeTextWrap>
        <TimeTextWrap>
          <Swiper
            direction="vertical"
            slidesPerView={3}
            centeredSlides={true}
            onSlideChange={handleEndTimeChange}
          >
            {endTimeOptions.map((time, index) => (
              <SwiperSlide key={index}>
                <TimeItem>{time}</TimeItem>
              </SwiperSlide>
            ))}
          </Swiper>
          <TextWrap>까지</TextWrap>
        </TimeTextWrap>
      </TimeContainer>
    </Container>
  );
};

export default TimeRangePicker;
