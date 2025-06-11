import React from "react";

function SingleBtn({id, className, onchange, btnText }) {
  return (
    <button
    id={id}
      onClick={onchange}
      className={`${className} 
    bg-gray-200
        px-6 py-2 text-lg
        font-semibold
        capitalize
        rounded-lg
        outline-none
        cursor-pointer
    `}
    >
      {btnText}
    </button>
  );
}

export default SingleBtn;
