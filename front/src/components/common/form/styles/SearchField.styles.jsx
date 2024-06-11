import styled from "styled-components";
import { Input } from "./TextField.styles.jsx";

export const SearchWrap = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 1px solid black;
  border-radius: 8px;

  padding: 12px 15px;

  &:focus {
    outline: none;
    border: 1px solid var(--main-hot-pink);
  }
`;

export const SearchResultsContainer = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 150px;

  top: 100%;

  overflow-y: scroll;

  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  z-index: 1;
`;

export const SearchResultItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
