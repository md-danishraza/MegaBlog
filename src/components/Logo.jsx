import React from "react";
import logosrc from "../assets/MegaBlog.png";
function Logo({ width = "100px" }) {
  return <img src={logosrc} alt="" className="w-[100px]" />;
}

export default Logo;
