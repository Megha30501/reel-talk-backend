const {admin} = require("../config/firebase");
const auth = admin.auth();

const registerUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Create a new user with email and password
      const userRecord = await auth.createUser({
        email: email,
        password: password,
      });
      
      // Return a success response
      res.status(201).json({
        message: 'User registered successfully',
        uid: userRecord.uid,
      });
    } catch (error) {
      console.error('Error registering new user:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    registerUser,
  };