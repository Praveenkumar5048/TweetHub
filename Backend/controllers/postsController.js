import { db } from "../database.js";

export const postData = async (req, res) => {
  try {
    const { userId, content, url, hashtags, location } = req.body;

    // Insert post into Posts table
    const insertPostQuery = `
      INSERT INTO Posts (user_id, content, media_url)
      VALUES (?, ?, ?)
    `;

    const result = await db.query(insertPostQuery, [userId, content, url]);

    if (result[0].affectedRows === 1) {
      const postId = result[0].insertId; // Get the newly inserted post ID

      // Iterate through hashtags and insert them into HashTag table
      for (const hashtag of hashtags) {
        const insertHashtagQuery = `
          INSERT INTO HashTag (hashTag_name, post_id)
          VALUES (?, ?)
        `;

        await db.query(insertHashtagQuery, [hashtag.trim(), postId]); // Trim whitespaces from hashtags
      }

      return res.status(201).json({ message: 'Post created successfully!' });
    } else {
      return res.status(500).json({ error: 'Failed to create post' });
    }
  } catch (error) {
    console.error('Error Creating Post:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};


export const getPosts = async (req, res) => {
  try {
    const getPostsQuery = `
      SELECT * FROM Posts
      ORDER BY posted_at DESC;
    `;

    const result = await db.query(getPostsQuery);

    // Extract post data from the result
    const posts = result[0];
    //console.log(posts);
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error Fetching Posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};