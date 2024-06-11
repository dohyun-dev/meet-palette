import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 25px;
  gap: 16px;
`;

export const PlaceHeader = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 600;
`;

export const PlaceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;

  color: rgba(0, 0, 0, 0.7);
  font-size: 13px;
`;

export const PlaceDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PlaceSubDescriptionWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PlaceContentItem = styled.span`
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.$color};
`;

export const PlaceRating = styled.span`
  background: #ff7a2c;
  padding: 5px 8px;
  border-radius: 30px;
  color: white;
`;

export const PlaceImageContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`;

export const PlaceImageItem = styled.img`
  width: 100px;
  height: 130px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 10px;
`;
