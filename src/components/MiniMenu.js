import React from "react";
import Link from "next/link";

const MiniMenu = props => {
  const title = props.title || "";
  const img_src = props.img || "";
  return (
    <div>
      <div className="mini-menu">
        <div>
          <a href="/comingsoon" target="_blank">
          <img className="mini-menu-icon" src={img_src} />
          </a>
        </div>
      </div>
      <div className="mini-menu">
        <span className="mini-menu-title">{title}</span>
      </div>
    </div>
  );
};
export default MiniMenu;
