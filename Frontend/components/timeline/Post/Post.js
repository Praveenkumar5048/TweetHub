import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Post({ user, postImage, likes, timestamp }) {
  return (
    <div className="w-full max-w-2xl mx-auto my-4"> {/* Adjusted width class to max-w-2xl */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center font-bold">
          <Avatar className="mr-2">
            {user.charAt(0).toUpperCase()}
          </Avatar>{" "}
          {user} • <span className="text-gray-500">{timestamp}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div>
        <img className="w-full rounded-md border border-gray-500" src={postImage} alt="Post Image" />
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex">
            <FavoriteBorderIcon className="postIcon p-1" />
            <ChatBubbleOutlineIcon className="postIcon p-1" />
          </div>
          <div>
            <BookmarkBorderIcon className="postIcon p-1" />
          </div>
        </div>
        <p className="mt-2">Liked by {likes} people.</p>
      </div>
    </div>
  );
}

export default Post;
