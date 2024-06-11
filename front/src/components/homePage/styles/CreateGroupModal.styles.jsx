import styled from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 230px;
  height: 63px;
  padding: 21px 0px;

  background: white;

  border: none;
  border-radius: 10px;
  box-shadow: 0px 3px 4px 0px rgba(255, 201, 211, 1);

  font-family: Jua;
  font-size: 24px;
  color: var(--main-hot-pink);
  font-weight: 500;

  &:active {
    border: none;
    background: var(--main-hot-pink);
    color: white;
  }
`;
