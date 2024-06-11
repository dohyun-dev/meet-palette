import { Wrap } from "./styles/TimeConfirmPage.styles.jsx";
import ModalHeader from "../components/common/modal/ModalHeader.jsx";
import ModalContent from "../components/common/modal/ModalContent.jsx";
import ModalAction from "../components/common/modal/ModalAction.jsx";
import ModalButton from "../components/common/modal/ModalButton.jsx";
import DateHitMap from "../components/timeConfirmPage/DateHitMap.jsx";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmGroupRequest, findTimeConfirmsRequest } from "../apis/index.js";

const TimeConfirmPage = () => {
  const navigate = useNavigate();

  const { groupCode } = useParams();

  const [data, setData] = useState({
    everyOneParticipation: false,
    availableTimes: [],
    participantsCount: 0,
  });

  const [selectTime, setSelectTime] = useState(null);

  const headerMap = useMemo(() => {
    return {
      true: {
        title: "최적의 날짜를 확인하세요!",
        subTitle: null,
        curStep: 3,
        totalStep: 3,
      },
      false: {
        title: "아직 약속 조정 중이에요!",
        subTitle: "약속 조정 현황을 보여드릴게요.",
        curStep: null,
        totalStep: null,
      },
    };
  }, []);

  const TITLE = useMemo(
    () => headerMap[data.everyOneParticipation].title,
    [data],
  );

  const SUB_TITLE = useMemo(
    () => headerMap[data.everyOneParticipation].subTitle,
    [data],
  );

  const CUR_STEP = useMemo(
    () => headerMap[data.everyOneParticipation].curStep,
    [data],
  );

  const TOTAL_STEP = useMemo(
    () => headerMap[data.everyOneParticipation].totalStep,
    [data],
  );

  useEffect(() => {
    findTimeConfirmsRequest(groupCode).then((response) => {
      setData(response);
    });
  }, [groupCode]);

  const handleClickPickDateTime = () => {
    confirmGroupRequest(groupCode, {
      confirmDateTime: selectTime,
    }).then((response) => handleClickNext());
  };

  const handleClickNext = () => {
    if (data.everyOneParticipation) {
      navigate(`/place-confirm/${groupCode}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Wrap gap={20}>
      <ModalHeader
        title={TITLE}
        subTitle={SUB_TITLE}
        curStep={CUR_STEP}
        totalStep={TOTAL_STEP}
      />
      <ModalContent>
        <DateHitMap
          everyOneParticipation={data.everyOneParticipation}
          availableTimes={data.availableTimes}
          participantsCount={data.participantsCount}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
        />
      </ModalContent>
      <ModalAction>
        {data.everyOneParticipation ? (
          <ModalButton onClick={handleClickPickDateTime}>시간 선택</ModalButton>
        ) : (
          <ModalButton onClick={handleClickNext}>확인</ModalButton>
        )}
      </ModalAction>
    </Wrap>
  );
};

export default TimeConfirmPage;
