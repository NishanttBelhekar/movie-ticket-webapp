import React from "react";
import { LuArmchair } from "react-icons/lu";

const Seat = ({ id, price, isSelected, onSelect }) => {
  const handleSeatClick = () => {
    onSelect(id, !isSelected, price);
  };

  return (
    <div
      className={`p-2 border border-gray-300 rounded-lg cursor-pointer ${
        isSelected ? "bg-indigo-200" : "hover:bg-gray-200"
      }`}
      onClick={handleSeatClick}
    >
      <LuArmchair className="text-indigo-600 w-4 h-4" />
      <div className="text-sm mt-1">Seat {id}</div>
      <div className="text-xs">Rs. {price}</div>
    </div>
  );
};

export default Seat;
