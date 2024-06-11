import { BrowserRouter, Route, Routes } from "react-router-dom";
import EnterGroupPage from "../pages/EnterGroupPage.jsx";
import TimeConfirmPage from "../pages/TimeConfirmPage.jsx";
import PlaceConfirmPage from "../pages/PlaceConfirmPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import CreateMeetingPage from "../pages/CreateMeetingPage.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-meeting" element={<CreateMeetingPage />} />
        <Route path="/enter-group/:groupCode" element={<EnterGroupPage />} />
        <Route path="/time-confirm/:groupCode" element={<TimeConfirmPage />} />
        <Route
          path="/place-confirm/:groupCode"
          element={<PlaceConfirmPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
