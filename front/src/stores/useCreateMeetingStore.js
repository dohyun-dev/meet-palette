import create from "zustand";
import { devtools, persist } from "zustand/middleware";

// 초기 상태 정의
const initialState = {
  meetingName: null,
  meetingParticipantsCount: null,
  groupLeaderPhoneNumber: null,
  meetingDateRangeStart: null,
  meetingDateRangeEnd: null,
  placeCoordinationType: null,
  candidatePlaces: [],
};

// 스토어 정의
const useCreateMeetingStore = create(
  persist(
    devtools((set, get) => ({
      createMeetingFormData: { ...initialState },

      setMeetingName: (meetingName) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            meetingName,
          },
        })),

      setMeetingParticipantsCount: (meetingParticipantsCount) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            meetingParticipantsCount,
          },
        })),

      setGroupLeaderPhoneNumber: (groupLeaderPhoneNumber) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            groupLeaderPhoneNumber,
          },
        })),

      setMeetingDateRangeStart: (meetingDateRangeStart) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            meetingDateRangeStart,
          },
        })),

      setMeetingDateRangeEnd: (meetingDateRangeEnd) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            meetingDateRangeEnd,
          },
        })),

      setPlaceCoordinationType: (placeCoordinationType) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            placeCoordinationType,
          },
        })),

      setCandidatePlaces: (candidatePlaces) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            candidatePlaces: [...candidatePlaces],
          },
        })),

      removeCandidatePlace: (id) =>
        set((state) => ({
          createMeetingFormData: {
            ...state.createMeetingFormData,
            candidatePlaces: state.createMeetingFormData.candidatePlaces.filter(
              (place) => place.id !== id,
            ),
          },
        })),

      resetCreateMeetingFormData: () =>
        set(() => ({ createMeetingFormData: { ...initialState } })),

      getCreateMeetingFormData: () => get().createMeetingFormData,
    })),
    {
      name: "create-meeting-form-data", // 로컬 스토리지에 저장될 키 이름
      getStorage: () => localStorage, // 기본 로컬 스토리지 사용
    },
  ),
);

export default useCreateMeetingStore;
