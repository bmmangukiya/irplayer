import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <div>Correct Script</div>
        <li style={{ width: "fit-content" }}>
          <NavLink to="/withaudioandscript" target="_blank">
            Audio Player & script
          </NavLink>
        </li>
        <li style={{ width: "fit-content" }}>
          <NavLink to="/withoutaudioandscript" target="_blank">
            No Audio Player & Script
          </NavLink>
        </li>
      </ul>
      <ul>
        <li style={{ width: "fit-content" }}>
          <NavLink to="/withaudio" target="_blank">
            Audio Player
          </NavLink>
        </li>
        <li style={{ width: "fit-content" }}>
          <NavLink to="/withoutaudio" target="_blank">
            No Audio Player
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
