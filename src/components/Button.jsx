import React from "react";

function Button({
  children,
  type = "button",

  textColor = "text-white",
  className = "cursor-pointer",
  ...props
}) {
  return (
    <button
      className={`${type}   ${textColor} ${textColor} ${className} cursor-pointer rounded-2xl`}
      {...props}
      type="submit"
    >
      {children}
    </button>
  );
}

export default Button;
