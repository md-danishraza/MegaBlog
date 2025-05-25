import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}></label>}
      <select
        id={id}
        {...props}
        ref={ref}
        className={`${className} px-3 py-2 rounded-lg bg-[#6c35de] text-white outline-none focus:bg-[#241b35] duration-200 border border-gray-200 w-full`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
