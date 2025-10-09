"use client";
import React from "react";
import "./MenuBtn.css";

interface MenuBtnProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      type="button"
      className={`menu-toggle ${isOpen ? "opened" : "closed"}`}
      aria-expanded={isOpen}
      onClick={toggleMenu}
    >
      <div className="menu-toggle-icon">
        <div className="hamburger">
          <div className="menu-bar" data-position="top"></div>
          <div className="menu-bar" data-position="bottom"></div>
        </div>
      </div>
      <div className="menu-copy">
        <p>Menu</p>
      </div>
    </button>
  );
};

export default MenuBtn;