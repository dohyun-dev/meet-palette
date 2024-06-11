import {
  Container,
  Item,
  PlaceContent,
  PlaceContentItem,
  PlaceDescription,
  PlaceHeader,
  PlaceImageContainer,
  PlaceImageItem,
  PlaceRating,
  PlaceSubDescriptionWrap,
} from "./styles/PlaceContainer.styles.jsx";

import PlaceLocation from "../../assets/icons/place-location.png";

const PlaceContainer = ({ data }) => {
  return (
    <Container>
      {data.map((place, idx) => (
        <Item key={idx}>
          <PlaceHeader>{idx + 1 + ". " + place.name}</PlaceHeader>
          <PlaceContent>
            <PlaceDescription>
              <PlaceContentItem>{place.category}</PlaceContentItem>
              <PlaceContentItem>
                <img
                  src={PlaceLocation}
                  style={{ height: 20, marginRight: 7 }}
                />
                {place.address}
              </PlaceContentItem>
              <PlaceContentItem $color={"rgba(0, 0, 0, 0.4)"}>
                {place.distance}
              </PlaceContentItem>
            </PlaceDescription>
            <PlaceSubDescriptionWrap>
              <PlaceContentItem $color={"rgba(0, 0, 0, 0.5)"}>
                평점
              </PlaceContentItem>
              <PlaceRating>{place.rating}</PlaceRating>
              <PlaceContentItem
                $color={"rgba(0, 0, 0, 0.4)"}
              >{`평가 ${place.ratingCount}명`}</PlaceContentItem>
            </PlaceSubDescriptionWrap>
            <PlaceSubDescriptionWrap>
              <PlaceContentItem $color={"rgba(0, 0, 0, 0.5)"}>
                메뉴
              </PlaceContentItem>
              <span>{place.menuDescription}</span>
            </PlaceSubDescriptionWrap>
          </PlaceContent>
          <PlaceImageContainer>
            {place.images.map((img, idx) => (
              <PlaceImageItem key={idx} src={`${img}`} />
            ))}
          </PlaceImageContainer>
        </Item>
      ))}
    </Container>
  );
};

export default PlaceContainer;
