import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";

function Sidenav() {
  return (
    <div className="fixed flex flex-col justify-between z-10">
      <h1 class="text-3xl ml-5 font-mono  text-white my-8">Tweetverse</h1>

      <div className="flex flex-col gap-5">
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <HomeIcon />
          <span className="ml-4 text-xl font-bold">Home</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <SearchIcon />
          <span className="ml-4 text-xl font-bold">Search</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <ExploreIcon />
          <span className="ml-4 text-xl font-bold">Explore</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <SlideshowIcon />
          <span className="ml-4 text-xl font-bold">Reels</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <ChatIcon />
          <span className="ml-4 text-xl font-bold">Messages</span>
        </button>
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <AddCircleOutlineIcon />
          <span className="ml-4 text-xl font-bold">Create</span>
        </button>
      </div>
      <div className="sidenav__header flex items-center py-4 px-4">
        <Avatar src={"http://localhost:8080/Uploads/profile_photos/Default_Profile_photo.png"} alt='skpsmpsap' className="mr-2 w-8 h-8" />
        <span className="text-xl font-bold">skpsmpsap</span>
      </div>
      <div className="fixed bottom-3">
        <button className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 hover:bg-gray-500">
          <MenuIcon />
          <span className="ml-4 text-xl font-bold">More</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
