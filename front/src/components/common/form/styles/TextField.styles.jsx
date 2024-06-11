import styled from "styled-components";

export const Input = styled.input`
  width: 100%;

  border: 1px solid black;
  border-radius: 8px;

  padding: 12px 15px;

  &:focus {
    outline: none;
    border: 1px solid var(--main-hot-pink);
  }
`;
