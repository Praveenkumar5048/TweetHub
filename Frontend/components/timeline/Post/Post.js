
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

function Post({ user, postImage, content , timestamp, likes, postId}) {
  
  const [ liked, setLiked ] = useState(false);
  const storedUserId = localStorage.getItem("userId");

  useEffect (() => {
    
    const checkUserLike = async () => {
      try {
        const response = await axios.post('http://localhost:8080/checkUserLike', {storedUserId, postId });
        if (response.status === 201) {
          setLiked(true); 
        }
      } catch(error) {
          console.error('Error checking like:', error);
      }
    }
    checkUserLike();
  }, []);

    const handleLike = async () => {
      try {
        if (liked) {
          // If the post is already liked, send a request to unlike it
         
          const response = await axios.post('http://localhost:8080/deleteLike', {storedUserId, postId });
          if(response.status === 201){
            setLiked(!liked);
          }
        } else {
          // If the post is not liked, send a request to like it
          const response = await axios.post('http://localhost:8080/insertLike', { storedUserId, postId });
          if(response.status === 201){
            setLiked(!liked);
          }
        }
        // Toggle the liked state
        
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    };


  return (
    <div className="w-full max-w-2xl mx-auto my-4"> 
      <div className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center font-bold">
        <div className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 ">
          <Avatar src={`http://localhost:8080/${user.profilePath}`} alt='skpsmpsap' className="mr-2 w-8 h-8" />
          <a href="/profile"><span className="text-xl text-white hover:text-blue-500">{user.displayName}</span></a>
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
              {liked ? (
              <FavoriteIcon
                className="postIcon p-1 text-red-500 cursor-pointer"
                onClick={handleLike}
              />
              ) : (
              <FavoriteBorderIcon
                className="postIcon p-1 cursor-pointer"
                onClick={handleLike}
              />
              )}
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
