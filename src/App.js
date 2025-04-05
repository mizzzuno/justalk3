import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import BorderContainer from "./components/BorderContainer";
import Typography from "@mui/material/Typography";
import AppRoutes from './routes/AppRoutes';
import './stylesheet/Body.css'

const AppContent = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="main-container">
      <BorderContainer>
        <Typography variant="h6">
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <AppRoutes />
        </Typography>
      </BorderContainer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;