import styled from "styled-components";
import HomeImage from "../../assets/images/homeImage.png";

export const Wrap = styled.div`
  position: relative;

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${HomeImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const MenuButtonBox = styled.div`
  position: absolute;
  bottom: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  width: 100%;
`;
