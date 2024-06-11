import { useState } from "react";
import {
  SearchInput,
  SearchResultItem,
  SearchResultsContainer,
  SearchWrap,
} from "./styles/SearchField.styles.jsx";
import { findSubwayRequest } from "../../../apis/index.js";
import XIcon from "../../../assets/icons/x.svg";
import TextBox from "../box/TextBox.jsx";

const SearchField = ({
  idx,
  value,
  onChange,
  handleRemoveItem,
  placeHolder = "검색하기",
}) => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchText(e.currentTarget.value);

    if (e.currentTarget.value)
      findSubwayRequest(e.currentTarget.value).then((response) => {
        setSearchResults(response);
      });
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setSearchText("");
    }, 200);
  };

  const handleClickSearchResultItem = (place) => {
    onChange(place, idx);
  };

  return value ? (
    <TextBox
      rightIcon={XIcon}
      onClickRightIcon={handleRemoveItem}
      style={{
        background: "white",
        border: "1px solid black",
        padding: "12px 15px",
        fontSize: "14px",
        lineHeight: "14px",
        fontWeight: 500,
        height: 41.5,
      }}
    >
      {value.placeName}
    </TextBox>
  ) : (
    <SearchWrap style={{ position: "relative" }}>
      <SearchInput
        name={name}
        value={searchText}
        placeholder={placeHolder}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
      {isFocused && searchResults.length > 0 && (
        <SearchResultsContainer>
          {searchResults.map((place, idx) => (
            <SearchResultItem
              key={place.id}
              onClick={() => handleClickSearchResultItem(place)}
            >
              {place.placeName}
            </SearchResultItem>
          ))}
        </SearchResultsContainer>
      )}
    </SearchWrap>
  );
};

export default SearchField;
