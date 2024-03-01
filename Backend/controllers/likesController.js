import { db } from "../database.js";

export const deleteLike = async (req, res) => {
    try {
      const { storedUserId, postId } = req.body;
      
      // delete like from likes table
      const deleteLikeQuery = `DELETE FROM likes WHERE user_id = ? AND post_id = ?`;
  
      const result = await db.query(deleteLikeQuery, [storedUserId, postId]);
      
      return res.status(201).json({ message: 'deleted successfully' });
   
    } catch (error) {
      console.error('Error deleting like:', error);
      return res.status(500).json({ error: 'Failed to delete like ' });
    }
  };

  export const insertLike = async (req, res) => {
    try {
      const { storedUserId, postId } = req.body;
   
      const insertLikeQuery = `INSERT INTO Likes(user_id, post_id) VALUES(?, ?)`;
  
      const result = await db.query(insertLikeQuery, [storedUserId, postId]);
      return res.status(201).json({ message: 'Inserted successfully' });
   
    } catch (error) {
      console.error('Error liking Post:', error);
      return res.status(500).json({ error: 'Failed to like post' });
    }
  };
  
  export const checkUserLike = async (req, res) => {
    try {
      const { storedUserId, postId } = req.body;
      
      const checkUserLikeLikeQuery = ` SELECT * FROM Likes WHERE user_id = ? AND post_id = ?`;
  
      const [result] = await db.query(checkUserLikeLikeQuery, [storedUserId, postId]);
      
      if(result.length === 1) {
        return res.status(201).json({ message: 'User as already Liked post' });
      }
      else {
        return res.status(404).json({ message: 'User has not liked the post' });
      }
   
    } catch (error) {
      console.error('Error checking like:', error);
      return res.status(500).json({ error: 'Failed to check like ' });
    }
  };


