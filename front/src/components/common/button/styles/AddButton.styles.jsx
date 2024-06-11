import styled from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  align-items: center;

  line-height: inherit;

  background: none;

  border: 1px solid black;
  border-radius: 8px;

  padding: 12px 15px;

  color: var(--color-gray-1);
  font-weight: 500;

  &:active {
    outline: none;
    border: 1px solid var(--main-hot-pink);
  }
`;

export const Plus = styled.img`
  margin-right: 6px;
`;
