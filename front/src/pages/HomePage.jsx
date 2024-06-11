import { MenuButtonBox, Wrap } from "./styles/HomePage.styles.jsx";
import { useState } from "react";
import HomeMenuButton from "../components/homePage/MenuButton.jsx";
import CreateGroupModal from "../components/homePage/CreateGroupModal.jsx";
import EnterGroupModal from "../components/homePage/EnterGroupModal.jsx";
import useCreateMeetingStore from "../stores/useCreateMeetingStore.js";

const HomePage = () => {
  const { resetCreateMeetingFormData } = useCreateMeetingStore();

  const [isVisibleCreateGroupModal, setIsVisibleCreateGroupModal] =
    useState(false);
  const [isVisibleEnterGroupModal, setIsVisibleEnterGroupModal] =
    useState(false);

  const handleClickCreateGroup = () => {
    setIsVisibleCreateGroupModal(true);
    resetCreateMeetingFormData();
  };

  const handleClickEnterGroup = () => {
    setIsVisibleEnterGroupModal(true);
  };

  return (
    <Wrap>
      <MenuButtonBox>
        <HomeMenuButton onClick={handleClickCreateGroup}>
          그룹 생성
        </HomeMenuButton>
        <HomeMenuButton onClick={handleClickEnterGroup}>
          그룹 입장
        </HomeMenuButton>
      </MenuButtonBox>
      {isVisibleCreateGroupModal && <CreateGroupModal />}
      {isVisibleEnterGroupModal && <EnterGroupModal />}
    </Wrap>
  );
};

export default HomePage;
