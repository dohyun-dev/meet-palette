import React, { useEffect, useState } from "react";
import { Wrap } from "./styles/PlaceConfirmPage.styles.jsx";
import ModalHeader from "../components/common/modal/ModalHeader.jsx";
import ModalContent from "../components/common/modal/ModalContent.jsx";
import ModalAction from "../components/common/modal/ModalAction.jsx";
import ModalButton from "../components/common/modal/ModalButton.jsx";
import TextBox from "../components/common/box/TextBox.jsx";
import Place from "../assets/icons/place2.png";
import Time from "../assets/icons/time.png";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate, useParams } from "react-router-dom";
import { findMeetingRequest } from "../apis/index.js";
import KakaoMap from "../components/placeConfirmPage/KakaoMap.jsx";
import MeetingReminderRegisterModal from "../components/placeConfirmPage/MeetingReminderRegisterModal.jsx";
import XIcon from "../assets/icons/x.svg";
import { CloseIcon } from "../components/placeConfirmPage/styles/MeetingReminderRegisterModal.styles.jsx";
import RecommendPlaceModal from "../components/placeConfirmPage/RecommendPlaceModal.jsx";

const PlaceConfirm = () => {
  const { groupCode } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [isVisibleRecommendedPlaceModal, setIsVisibleRecommendedPlaceModal] =
    useState(false);

  const [
    isVisibleMeetingReminderRegisterModal,
    setIsVisibleMeetingReminderRegisterModal,
  ] = useState(false);

  const handleClickClose = () => {
    navigate("/");
  };

  const handleClickCheckRecommendedPlace = () => {
    setIsVisibleRecommendedPlaceModal(true);
  };

  const handleClickMeetingReminderRegister = () => {
    setIsVisibleMeetingReminderRegisterModal(true);
  };

  const handleClickCloseModal = () => {
    setIsVisibleRecommendedPlaceModal(false);
    setIsVisibleMeetingReminderRegisterModal(false);
  };

  useEffect(() => {
    findMeetingRequest(groupCode)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {});
  }, [groupCode]);

  return (
    <Wrap gap={15}>
      <ModalHeader
        title={"약속이 확정되었습니다!"}
        subTitle={"날짜, 위치 확정 결과를 공유해드립니다"}
      />
      <ModalContent gap={10}>
        {data && (
          <>
            <KakaoMap
              latitude={data.meetingPlace.latitude}
              longitude={data.meetingPlace.longitude}
            />
            <TextBox leftIcon={Place} textAlign={"center"} fontFamily={"Jua"}>
              {data.meetingPlace.placeName}
            </TextBox>
            <TextBox leftIcon={Time} textAlign={"center"} fontFamily={"Jua"}>
              {format(data.meetingTime, "MM월 dd일 HH:mm", { locale: ko })}
            </TextBox>
          </>
        )}
      </ModalContent>
      <ModalAction gap={10}>
        <ModalButton onClick={handleClickCheckRecommendedPlace}>
          추천장소 확인하기
        </ModalButton>
        <ModalButton onClick={handleClickMeetingReminderRegister}>
          약속 3일전 알림받기
        </ModalButton>
      </ModalAction>
      {isVisibleRecommendedPlaceModal && (
        <RecommendPlaceModal
          place={data.meetingPlace.placeName}
          onClickClose={handleClickCloseModal}
        />
      )}
      {isVisibleMeetingReminderRegisterModal && (
        <MeetingReminderRegisterModal
          groupCode={groupCode}
          onClickClose={handleClickCloseModal}
        />
      )}
      <CloseIcon $top={30} $right={30} src={XIcon} onClick={handleClickClose} />
    </Wrap>
  );
};

export default PlaceConfirm;
