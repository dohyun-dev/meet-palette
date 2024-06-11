import { Result, Wrap } from "./styles/CreateUrlResult.styles.jsx";

const CreateUrlResult = ({ result }) => {
  const handleCopy = (copyText) => {
    window.navigator.clipboard.writeText(copyText).then().catch();
  };

  return (
    <Wrap>
      <Result>
        그룹코드 : {result.groupCode} {/*<CopyIcon*/}
        {/*  src={ClipBoard}*/}
        {/*  onClick={() => handleCopy(result.groupCode)}*/}
        {/*/>*/}
      </Result>
      {/*  <Result>*/}
      {/*    {result.groupUrl}*/}
      {/*    <CopyIcon src={ClipBoard} onClick={() => handleCopy(result.groupUrl)} />*/}
      {/*  </Result>*/}
    </Wrap>
  );
};

export default CreateUrlResult;
