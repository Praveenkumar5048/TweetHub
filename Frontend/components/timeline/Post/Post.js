import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Post({ user, postImage, content , timestamp}) {

  return (
    <div className="w-full max-w-2xl mx-auto my-4"> 
      <div className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center font-bold">
        <div className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 ">
          <Avatar src={`http://localhost:8080/${user.profile_path}`} alt='skpsmpsap' className="mr-2 w-8 h-8" />
          <a href={`/profile/${user.user_id}`}><span className="text-xl text-white hover:text-blue-500">{user.displayname}</span></a>
        </div>
        <span className="text-gray-500">
          {new Date(timestamp).toLocaleDateString()}
        </span>
      </div>
      </div>
      <div class="p-6 rounded-lg shadow-md">
        <p class="text-white text-base leading-6 text-center">{content}</p>
    </div>
    <div>
      {postImage && postImage.endsWith('.mp4') ? (
        <video className="w-full rounded-md" controls>
          <source src={`http://localhost:8080/${postImage}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        postImage && (
          <img
            className="w-full rounded-md border border-gray-500"
            src={`http://localhost:8080/${postImage}`}
            alt="Post Image"
          />
        )
      )}
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
        <p className="mt-2">Liked by 12 people.</p>
      </div>
    </div>
  );
}

export default Post;
