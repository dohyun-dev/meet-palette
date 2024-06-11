import { CustomButton } from "./styles/TimeEnterButton.styles.jsx";
import React from "react";

const TimeEnterButton = ({ children, onClick }) => {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

export default React.memo(TimeEnterButton);
