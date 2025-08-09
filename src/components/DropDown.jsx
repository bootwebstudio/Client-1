import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";

const DropDown = ({ label, name, options, value, onChange, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onToggle]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        className="p-4 w-full rounded bg-zinc-800 outline-none border-none text-white text-left flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        {value || label}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-3 w-full bg-zinc-800 rounded shadow-lg max-h-48 overflow-y-auto z-50">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 px-4 cursor-pointer hover:bg-zinc-700"
              onClick={() => {
                onChange({ target: { name, value: option } });
                setIsOpen(false);
                onToggle(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
