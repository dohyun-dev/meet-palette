import { useState } from "react";
import { ButtonItem, Container } from "./styles/CategoryContainer.styles.jsx";

const CategoryContainer = ({ selectCategory, setSelectCategory }) => {
  const [categoryList, setCategoryList] = useState([
    "🍽️ 식사",
    "🍺 술",
    "☕ 카페",
    "📖 스터디/회의",
    "🎡 놀거리",
    "직접 입력",
  ]);

  const handleClickItem = (idx) => {
    setSelectCategory(idx);
  };

  return (
    <Container>
      {categoryList.map((category, idx) => (
        <ButtonItem
          key={idx}
          $isSelect={selectCategory === idx}
          onClick={() => handleClickItem(idx)}
        >
          {category}
        </ButtonItem>
      ))}
    </Container>
  );
};

export default CategoryContainer;
