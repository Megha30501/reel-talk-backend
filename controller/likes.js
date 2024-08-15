const { admin } = require("../config/firebase");
const db = admin.firestore();

// to add likes to post or commnets tied to community
const addLike = async (req, res) => {
  const { postId, commentId, communityId } = req.body;
  const userId = req.user.uid;

  try {
    if (!postId && !commentId) {
      return res.status(400).send("postId or commentId is required");
    }

    if (!communityId) {
      return res.status(400).json({ error: "communityId is required" });
    }

    const likeRef = db.collection("Likes");

    const likeData = await likeRef.add({
      userId,
      postId: postId || null,
      commentId: commentId || null,
      communityId,
      createdAt: new Date(),
    });
    console.log("Saving like data:", likeData);
    res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Failed to add like" });
  }
};

// to get all the post or comments with likes
const getLike = async (req, res) => {
  const userId = req.user.uid;

  try {
    const likeRef = db.collection("Likes").where("userId", "==", userId);
    const response = await likeRef.get();

    if (response.empty) {
      return res.status(404).send("No likes found.");
    }

    let responseArr = [];
    response.forEach((doc) => {
      responseArr.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(responseArr);
  } catch (error) {
    console.error("Error getting like:", error);
    res.status(500).json({ error: "Failed to get like" });
  }
};

module.exports = { addLike, getLike };
