import React from "react";
import { Box, LeftIcon, RightIcon } from "./styles/TextBox.styles.jsx";

const TextBox = ({
  children,
  leftIcon,
  rightIcon,
  textAlign,
  onClickRightIcon,
  fontFamily,
  style,
  onClick,
}) => {
  return (
    <Box
      $textAlign={textAlign}
      $fontFamily={fontFamily}
      style={style}
      onClick={onClick}
    >
      {leftIcon && <LeftIcon src={leftIcon} />}
      {children}
      {rightIcon && <RightIcon src={rightIcon} onClick={onClickRightIcon} />}
    </Box>
  );
};

export default React.memo(TextBox);
