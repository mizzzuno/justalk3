import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BasicPie from "../components/PieChart";
import RecordingButton from "../components/RecordingButton";
import AddMember from "../pages/AddMember"; 
import Feedback from "../pages/Feedback";
import TalkDetail from "../pages/TalkDetail";
import Reset from "../pages/Reset";
import MemberSelect from "../pages/MemberSelect";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="components-container">
          <BasicPie />
          <RecordingButton />
        </div>
      } />
      <Route path="/add-member" element={<AddMember />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/talk-detail" element={<TalkDetail />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/member-select" element={<MemberSelect />} />
    </Routes>
  );
};

export default AppRoutes; 