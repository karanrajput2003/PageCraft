import React from "react";

export const BentoCard = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
