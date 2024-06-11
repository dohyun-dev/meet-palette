import { useEffect, useState } from "react";
import {
  Wrap,
  ModalTitle,
  ModalSubTitle,
  Step,
} from "./styles/ModalHeader.styles.jsx";

const ModalHeader = ({
  curStep,
  totalStep,
  title,
  subTitle,
  textAlign,
  style,
  stepStyle,
  titleStyle,
  subTitleStyle,
}) => {
  const [hasNewline, setHasNewline] = useState(false);

  useEffect(() => {
    setHasNewline(title.includes("\n"));
  }, [title]);

  return (
    <Wrap $textAlign={textAlign} style={style}>
      {curStep && totalStep && (
        <Step style={stepStyle}>{`${curStep} / ${totalStep}`}</Step>
      )}
      <ModalTitle hasNewLine={hasNewline} style={titleStyle}>
        {title}
      </ModalTitle>
      {subTitle && (
        <ModalSubTitle style={subTitleStyle}>{subTitle}</ModalSubTitle>
      )}
    </Wrap>
  );
};

export default ModalHeader;
