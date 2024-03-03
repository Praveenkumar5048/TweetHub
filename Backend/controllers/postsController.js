import { db } from "../database.js";

export const postData = async (req, res) => {
  try {
    const { userId, content, url, hashtags, location } = req.body;

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

        await db.query(insertHashtagQuery, [hashtag.trim(), postId]); 
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
    SELECT * FROM Posts ORDER BY posted_at DESC `;

    const result = await db.query(getPostsQuery);
    const posts = result[0];
    
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error Fetching Posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPerticularPost = async (req, res) => {
  const postId = req.params.post_id;

  try {
    const getPostsQuery = `
    SELECT Posts.*, COUNT(Likes.like_id) AS like_count
    FROM Posts
    LEFT JOIN Likes ON  Likes.post_id = ?
    WHERE  Posts.post_id = ?
    `;

    const result = await db.query(getPostsQuery, [postId, postId]);
    const posts = result[0];
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error Fetching Posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostsOfUser = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const getPostsQuery = `
      SELECT * FROM Posts
      WHERE user_id = ?
      ORDER BY posted_at DESC;
    `;

    const result = await db.query(getPostsQuery, [userId]);
    const posts = result[0];
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error Fetching Posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


export const getPostsByHashtag = async (req, res) => {

  const hastagName = req.params.hashtag_name;
  try {
    const getPostsQuery = `
    SELECT Posts.*, COUNT(Likes.like_id) AS like_count
    FROM Posts
    LEFT JOIN Likes ON Posts.post_id = Likes.post_id
    WHERE Posts.post_id IN (
      SELECT post_id
      FROM Hashtag
      WHERE hashTag_name = ?
    )
    GROUP BY Posts.post_id
    ORDER BY Posts.posted_at DESC`;

    const result = await db.query(getPostsQuery,[hastagName]);
    const posts = result[0];
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error Fetching Posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


export const getPostsBySearchQuery = async (req, res) => {
  const searchQuery = req.params.search_query;

  if (searchQuery === '') {
    console.log('No Search Query Provided');
    return getPosts(req, res);
  }

  try {
    const getPostsQuery = `
      SELECT DISTINCT Posts.*, COUNT(Likes.like_id) AS like_count
      FROM Posts
      LEFT JOIN Likes ON Posts.post_id = Likes.post_id
      WHERE Posts.content LIKE ? OR 
            Posts.post_id IN (
              SELECT post_id
              FROM Comments
              WHERE content LIKE ?
            ) OR
            Posts.post_id IN (
              SELECT post_id
              FROM HashTag
              WHERE hashTag_name LIKE ?
            )
      GROUP BY Posts.post_id
    `;

    const resultPosts = await db.query(getPostsQuery, [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`]);

    const posts = resultPosts[0];

    // Fetch hashtags for each post
    const postIds = posts.map(post => post.post_id);
    const getHashtagsQuery = `
      SELECT post_id, hashTag_name
      FROM HashTag
      WHERE post_id IN (${postIds.length > 0 ? postIds.join(',') : null})
    `;

    const resultHashtags = await db.query(getHashtagsQuery);
    const postHashtags = resultHashtags[0];

    // Combine posts with hashtags
    const postsWithHashtags = posts.map(post => {
      const hashtags = postHashtags
        .filter(hashtag => hashtag.post_id === post.post_id)
        .map(hashtag => hashtag.hashTag_name);

      return {
        ...post,
        hashtags,
      };
    });

    return res.status(200).json(postsWithHashtags);
  } catch (error) {
    console.error('Error Fetching Posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


// 