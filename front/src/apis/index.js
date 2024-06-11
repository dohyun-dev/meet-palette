import axios from "axios";

export const BASE_URL = "http://13.209.82.23:8080";

const API = axios.create({
  baseURL: BASE_URL, // 소문자 baseURL로 수정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const createMeetingRequest = async (data) => {
  console.log(data);
  try {
    const response = await API.post("/api/v1/meetings", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const enterGroupRequest = async (groupCode, data) => {
  // data.availableTimes.map((time) -> )

  try {
    const response = await API.post(
      `/api/v1/meetings/${groupCode}/enter-group`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const confirmGroupRequest = async (groupCode, data) => {
  // data.availableTimes.map((time) -> )

  try {
    const response = await API.post(
      `/api/v1/meetings/${groupCode}/confirm-group`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const reminderMeetingRequest = async (groupCode, phoneNumber) => {
  try {
    const response = await API.post(`/api/v1/meetings/${groupCode}/reminder`, {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const findMeetingRequest = async (groupCode) => {
  try {
    const response = await API.get(`/api/v1/meetings/${groupCode}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const findSubwayRequest = async (subwayName) => {
  try {
    const response = await API.get("/api/v1/meetings/find-subway", {
      params: { subwayName },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findTimeConfirmsRequest = async (groupCode) => {
  try {
    const response = await API.get(
      `/api/v1/meetings/${groupCode}/time-confirms`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
