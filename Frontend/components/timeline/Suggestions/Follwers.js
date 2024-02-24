import { Avatar } from "@mui/material";
import React from "react";

function Suggestions() {
  return (
    <div className="mt-8 mr-4">
      <div className="font-bold text-gray-500">Suggestions for you</div>
      <div className="suggestions__usernames">
        {[...Array(6).keys()].map((index) => (
          <div key={index} className="suggestions__username flex justify-between mt-4">
            <div className="username__left flex">
              <span className="avatar">
                <Avatar>R</Avatar>
              </span>
              <div className="username__info flex flex-col ml-2">
                <span className="username font-semibold">redian_</span>
                <span className="relation text-gray-500 text-xs">New to Instagram</span>
              </div>
            </div>
            <button className="rounded-xl text-blue-500 font-bold bg-transparent border-0 mr-1 hover:text-white">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
