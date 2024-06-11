import styled from "styled-components";

import { Input } from "../../common/form/styles/TextField.styles.jsx";

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const CustomInput = styled(Input)`
  width: 100%;
  height: 50px;

  background: var(--color-gray-2);
  border: none !important;

  text-align: center;

  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;

  padding: 0px 50px;

  &:focus {
    outline: none;

    &::placeholder {
      color: transparent;
    }
  }

  &::placeholder {
    color: gray;
  }
`;
