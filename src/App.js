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
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <AppRoutes />
          </div>
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