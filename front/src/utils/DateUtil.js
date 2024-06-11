import { format } from "date-fns";
import { ko } from "date-fns/locale";

const DateUtil = {
  formatDay: (date) => {
    const day = date.getDate();
    return day.toLocaleString("ko-KR", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  },

  formatMonthYear: (date) => {
    const month = date.toLocaleDateString("ko-KR", { month: "long" });
    const year = date.getFullYear();
    return `${year}년 ${month}`;
  },

  getMonth: (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
  },

  // 한달을 배열로 만드는 함수
  getDatesInMonth: (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const day = new Date(year, month + 1, 0).getDate();

    // 1일부터 마지막 날짜까지 배열 생성
    const dates = Array.from(
      { length: day },
      (_, i) => new Date(year, month, i + 1),
    );

    return dates;
  },
  createDateObject: (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date;
  },

  dateToString: (date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss", { locale: ko });
  },
};

export default DateUtil;
