// 필요한 모듈을 가져옵니다
import create from "zustand";
import { devtools } from "zustand/middleware";

// 초기 상태 정의
const initialState = {
  availableTimes: [],
  selectMeetingPlace: null,
  phoneNumber: null,
};
// 스토어 정의
const useEnterGroupStore = create(
  devtools((set, get) => ({
    enterGroupFormData: { ...initialState },
    meetingData: {},

    setSelectMeetingPlace: (selectMeetingPlace) =>
      set((state) => ({
        enterGroupFormData: {
          ...state.enterGroupFormData,
          selectMeetingPlace,
        },
      })),

    setAvailableTimes: (availableTimes) =>
      set((state) => ({
        enterGroupFormData: {
          ...state.enterGroupFormData,
          availableTimes,
        },
      })),

    setPhoneNumber: (phoneNumber) => {
      set((state) => ({
        enterGroupFormData: {
          ...state.enterGroupFormData,
          phoneNumber,
        },
      }));
    },

    setMeetingData: (meeting) =>
      set(() => ({
        meetingData: meeting,
      })),

    getEnterGroupFormData: () => get().enterGroupFormData,

    getMeetingData: () => get().meetingData,
  })),
);

export default useEnterGroupStore;
