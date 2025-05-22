import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "cursor-pointer",
  ...props
}) {
  return (
    <button
      className={`${type} ${bgColor}  ${textColor} ${textColor} ${className}`}
      {...props}
      type="submit"
    >
      {children}
    </button>
  );
}

export default Button;
