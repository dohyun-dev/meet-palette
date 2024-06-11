import styled from "styled-components";
import React from "react";

const Button = ({ isPicked, ...rest }) => <button {...rest} />;

export const SelectOption = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid var(--main-light-pink1);
  border-radius: 8px;

  background: ${(props) =>
    props.isPicked ? "var(--main-light-pink1)" : "none"};

  font-weight: 500;
  letter-spacing: -0.5px;

  line-height: 20px;
  padding: 10px 0;

  color: black;

  &:hover {
    background: var(--main-light-pink1);
  }
`;
