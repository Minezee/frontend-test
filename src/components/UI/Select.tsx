import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface SelectOption {
  value: string;
  name: string;
}

interface SelectProps {
  label: string;
  value: string;
  onSelect: (value: string) => void;
  options: SelectOption[];
}

const Select = ({ value, onSelect, options, label }: SelectProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsActive(false);
  };

  const selectedName =
    options?.find((option) => option.value === value)?.name || `${label} By:`;

  return (
    <div className="w-full flex-1 max-w-[150px] lg:max-w-[200px] relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="text-sm p-2 border border-gray-500 w-full text-start flex items-center justify-between rounded-lg truncate"
      >
        <span className="truncate w-40">{selectedName}</span>
        {isActive ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Dropdown menu for desktop */}
      {isActive && (
        <div className="absolute border border-gray-500 mt-2 w-full p-2 bg-white/50 backdrop-blur-xl rounded-lg z-10 hidden lg:block">
          {options?.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`block w-full text-left text-sm p-2 rounded-lg ${
                value === option.value
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}

      {/* Dropdown menu for mobile */}
      <div
        className={`block lg:hidden fixed ${
          isActive ? "top-0" : "top-full"
        } left-0 z-[999] bottom-0 w-full flex items-center justify-center transition-opacity duration-500 bg-[#262B1F]/50`}
      >
        <div
          className={`absolute flex flex-col gap-2 w-full ${
            isActive ? "bottom-0" : "-bottom-[999px]"
          } bg-white px-4 pt-2 pb-4 transition-all duration-300`}
        >
          <div className="flex items-center justify-between w-full text-m-regular font-bold py-2">
            <span>{label}</span>
            <button onClick={() => setIsActive(false)}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10.0002L3.33337 3.3335M10 10.0002L16.6667 16.6668M10 10.0002L16.6667 3.3335M10 10.0002L3.33337 16.6668"
                  stroke="#1A141F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="p-2 border-t border-disabled flex flex-col gap-4">
            <div className="flex flex-col gap-5">
              {options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`flex items-center justify-between text-start ${
                    value === option.value
                      ? "text-old-moss-green"
                      : "text-black"
                  }`}
                >
                  {option.name}
                  {value === option.value && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6666 5.8335L8.33329 14.1668L4.16663 10.0002"
                        stroke="#7C7D3F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
