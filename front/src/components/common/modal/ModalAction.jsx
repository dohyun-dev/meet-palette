import { Wrap } from "./styles/ModalAction.styles.jsx";
import React from "react";

const ModalAction = ({ children, gap, mt, mb }) => {
  return (
    <Wrap gap={gap} $mt={mt} $mb={mb}>
      {children}
    </Wrap>
  );
};

export default React.memo(ModalAction);
