import { Button } from "./styles/ModalButton.styles.jsx";
import React from "react";

const ModalButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default React.memo(ModalButton);
