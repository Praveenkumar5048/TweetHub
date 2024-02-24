import React from 'react';

const TabButton = ({ onClick, isActive, icon, className, label }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl flex items-center px-4 py-2 border-b-2 border-transparent text-base font-medium focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out ${className} ${isActive ? 'border-blue-500' : ''}`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default TabButton;
