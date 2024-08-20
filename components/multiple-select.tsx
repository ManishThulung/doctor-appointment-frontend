"use client";

import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

// Define the type for options
interface Option {
  value: string;
  label: string;
}

// Define a generic type for MultiSelect props
interface MultiSelectProps<T> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  options: Option[];
  fieldName: keyof T; // Key of the generic type T
}

// MultiSelect component
const MultipleSelect = <T,>({
  formData,
  setFormData,
  options,
  fieldName,
}: MultiSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(formData[fieldName] as unknown as string[])
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) => {
      const newSelections = new Set(prev);
      if (newSelections.has(value)) {
        newSelections.delete(value);
      } else {
        newSelections.add(value);
      }
      setFormData({
        ...formData,
        [fieldName]: Array.from(newSelections),
      } as T);
      return newSelections;
    });
  };

  // Handle click outside to close the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Define the event handler
    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);

    // Add event listener
    document.addEventListener("mousedown", handleMouseDown);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [formData, fieldName]);

  return (
    <div className="relative dropdown space-y-2">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full relative px-3 py-2 border border-slate-200 rounded-md bg-white text-start flex items-center justify-between  "
      >
        <span>Select {fieldName as string}</span>
        <RiArrowDropDownLine size={30} />
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10  max-h-40 overflow-y-auto ">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-300"
            >
              <input
                type="checkbox"
                checked={selectedOptions.has(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
