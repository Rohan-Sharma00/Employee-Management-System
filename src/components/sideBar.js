import "./sideBarCss.css";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);

  const show = () => {
    setShowSideBar(!showSideBar);
  }

  return (<div>
    <div id="hamburger"><span className="material-symbols-outlined" onClick={show}>menu</span></div>
    {  showSideBar ?
      (
        <div className="sideBar">
          <div id="title">Navigation Bar </div>
          <div className="element" onClick={() => { navigate("/insert") }}>
            <span className="material-symbols-outlined">person_add</span>
            <span>Insert Person</span>
          </div>
          <div className="element" onClick={() => { navigate("/details") }}>
            <span className="material-symbols-outlined">person</span>
            <span>Show Persons</span>
          </div>

        </div>
      ) : null }
  </div>
);
      }
export default SideBar;