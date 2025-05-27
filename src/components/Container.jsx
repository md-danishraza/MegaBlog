import React from "react";

function Container(prop) {
  return <div className="w-full  max-w-7xl mx-auto  px-4">{prop.children}</div>;
}

export default Container;
