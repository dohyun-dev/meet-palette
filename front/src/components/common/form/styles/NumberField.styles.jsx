import styled from "styled-components";
import Plus from "../../../../assets/icons/plus.svg";
import Minus from "../../../../assets/icons/minus.svg";
import React from "react";

export const InputWrap = styled.div`
  border: 1px solid black;
  border-radius: 8px;

  display: flex;
  align-items: center;

  overflow: hidden;

  &:focus {
    outline: none;
    border: 1px solid var(--main-hot-pink);
  }
`;

export const NumberDisplay = styled.div`
  width: 100%;

  padding: 12px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  border-left: 1px solid black;
  border-right: 1px solid black;
`;

export const Button = styled.div`
  width: 64px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: none;
  cursor: pointer;

  //&:active {
  //  background: var(--main-pink2);
  //}
`;
