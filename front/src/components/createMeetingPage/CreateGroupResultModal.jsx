import Modal from "../common/modal/ModalLayout.jsx";
import ModalHeader from "../common/modal/ModalHeader.jsx";
import ModalContent from "../common/modal/ModalContent.jsx";
import CreateUrlResult from "./CreateUrlResult.jsx";
import ModalAction from "../common/modal/ModalAction.jsx";
import ModalButton from "../common/modal/ModalButton.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateGroupResultModal = ({ result }) => {
  const navigate = useNavigate();

  const TITLE = "약속 링크가 생성 되었어요.\n친구들에게 공유해보세요!";
  const SUB_TITLE = "참여자들의 일정을 알아볼까요?";

  const handleClickKakaoShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "약속이 생성되었어요!",
        description: "참여자들의 일정을 알아볼까요?",
        imageUrl:
          "https://economychosun.com/site/data/img_dir/2023/10/09/2023100900024_0.jpg",
        link: {
          mobileWebUrl: result.groupUrl,
          webUrl: result.groupUrl,
        },
      },
      buttons: [
        {
          title: "약속 정하러가기",
          link: {
            mobileWebUrl: result.groupUrl,
            webUrl: result.groupUrl,
          },
        },
      ],
    });
  };

  const handleClickHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("8a30928fb117d22074aa038cbacc34ae");
    }
  }, []);

  return (
    <Modal gap={20}>
      <ModalHeader
        title={TITLE}
        subTitle={SUB_TITLE}
        curStep={2}
        totalStep={2}
      />
      <ModalContent gap={30}>
        <CreateUrlResult result={result} />
      </ModalContent>
      <ModalAction gap={10}>
        <ModalButton onClick={handleClickKakaoShare}>
          카카오톡으로 공유하기
        </ModalButton>
        <ModalButton onClick={handleClickHome}>홈화면으로</ModalButton>
      </ModalAction>
    </Modal>
  );
};

export default CreateGroupResultModal;
