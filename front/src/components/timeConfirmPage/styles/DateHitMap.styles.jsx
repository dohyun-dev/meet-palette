import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const DateHitMapWrapper = styled.div`
  display: inline-block;
  overflow: hidden;
  color: gray;
  border-radius: 5.5px;
  border: 1px solid black;
  font-family: Jua;
`;

export const Top = styled.div`
  display: flex;
  height: 36px;
  border-bottom: 1px solid black;
  overflow: hidden;
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;
`;

export const Blank = styled.div`
  width: 24px;
  height: 36px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;

export const DateWrapper = styled.div`
  display: flex;
  height: 36px;
`;

export const Date = styled.div`
  width: 88px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  overflow: hidden;
  background: none;
  border-left: 1px solid black;
  &:first-of-type {
    border-left: none;
  }
`;

export const TimeWrapper = styled.div`
  width: 24px;
  border-right: 1px solid black;
  background: none;
`;

export const Time = styled.div`
  width: 24px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  & + & {
    border-top: 1px solid black;
  }
`;

export const SelectWrapper = styled.div`
  width: 88px;
  & + & {
    border-left: 1px solid black;
  }
`;

export const Select = styled.div`
  width: 88px;
  height: 19px;
  box-sizing: content-box;
  background-color: ${({ $count, $total }) =>
    $count === -1
      ? "none"
      : $total === 0
        ? 0
        : `rgba(255, 85, 85, ${$count / $total})`};

  cursor: pointer;

  background: ${({ $isSelect }) => ($isSelect ? "orange !important" : "")};

  &:nth-of-type(odd) {
    border-bottom: 1px dashed black;
  }
  &:nth-of-type(even) {
    border-bottom: 1px solid black;
  }
  &:first-of-type {
    padding-top: 1px;
  }
  &:last-of-type {
    border-bottom: none;
  }
`;
