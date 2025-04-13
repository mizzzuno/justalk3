import React from "react";
import IconButtons from "./IconButton";
import IconMenu from "./IconMenu";
import "./../stylesheet/Header.css";

const Header = ({ menuOpen, setMenuOpen }) => {
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="header-container">
      <IconButtons onClick={toggleMenu} />
      {menuOpen && <IconMenu onClose={toggleMenu} />}
      <h1 className="title">Justalk</h1>
    </div>
  );
};

export default Header;
