import { useState } from "react";
import React from 'react'
import IconButtons from './IconButton'
import IconMenu from './IconMenu'
import './../stylesheet/Header.css'


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
      };

  return (
    <div>
        <IconButtons onClick={toggleMenu} />
          {menuOpen && <IconMenu />}
          <h1>Justalk</h1>
    </div>
  )
}

export default Header;