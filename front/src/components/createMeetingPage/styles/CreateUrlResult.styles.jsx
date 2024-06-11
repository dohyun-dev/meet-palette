import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;

  font-size: 13px;
  font-weight: 500;
  color: var(--color-gray-1);

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Result = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  border: 1px solid black;
  border-radius: 8px;

  padding: 12px 15px;
`;

export const CopyIcon = styled.img`
  position: absolute;
  right: 20px;
  height: 22px;
  top: 50%;
  transform: translateY(-50%);
`;
