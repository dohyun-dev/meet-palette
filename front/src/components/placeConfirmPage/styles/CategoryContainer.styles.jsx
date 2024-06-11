import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  margin: 0px 30px;
`;

export const ButtonItem = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 8px 13px;

  margin: 8px 12px 8px 0px;

  background: none;

  border: 2px solid var(--main-light-pink1);
  border-radius: 159px;

  font-family: Inter;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-align: center;

  cursor: pointer;

  background: ${(props) => props.$isSelect && "var(--main-light-pink1)"};
`;
