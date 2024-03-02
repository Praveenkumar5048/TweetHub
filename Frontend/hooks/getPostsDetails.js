import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getposts`);
      const fetchedPosts = response.data;
      const postsWithUserDetails = await Promise.all(
        fetchedPosts.map(async (post) => {
          const userResponse = await axios.get(`${BASE_URL}/userDetails/${post.user_id}`);
          const user = userResponse.data;
          return { ...post, user }; 
        })
      );
     return  postsWithUserDetails;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  export const fetchPostByPostId = async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/post/${postId}`); // Get post directly by post_id
      const fetchedPost = response.data[0];
      if (fetchedPost) { // Ensure a post was found
        const userResponse = await axios.get(`${BASE_URL}/userDetails/${fetchedPost.user_id}`); // Fetch user details
        const user = userResponse.data;
        return { ...fetchedPost, user }; // Combine post and user details
      } else {
        return null; // Return null if no post found for the ID
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error; // Re-throw for error handling in the component
    }
  };