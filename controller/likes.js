const { admin } = require("../config/firebase");
const db = admin.firestore();

const addLike = async (req, res) => {
  const { postId, commentId, communityId } = req.body;
  const userId = req.user.uid;

  try {
    if (!postId || !commentId) {
      return res.status(400).send("postId or commentId is required");
    }

    if (!communityId) {
      return res.status(400).json({ error: "communityId is required" });
    }

    const likeRef = db.collection("Likes").doc(postId);

    const likeData = await likeRef.set({
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

module.exports = { addLike };
