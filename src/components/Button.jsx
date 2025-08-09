import React from "react";

const Button = ({ content, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full mt-2 mx-0 p-4 text-lg lg:text-xl font-medium lowercase rounded font-[DIRTYLINE] bg-[#E30A03] hover:bg-[#620905] transition-all duration-400 ease-in-out"
    >
      {content}
    </button>
  );
};

export default Button;
