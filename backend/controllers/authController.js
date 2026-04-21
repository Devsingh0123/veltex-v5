import Admin from '../models/Admin.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Database mein admin ko search karein (Mongoose.findOne jaisa)
    const admin = await Admin.findOne({
      where: {
        username: username,
        password: password // Industry mein ise hash (bcrypt) kiya jata hai, abhi ke liye plain text
      }
    });

    if (admin) {
      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        admin: { username: admin.username }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid Database Credentials'
      });
    }

  } catch (error) {
    console.error('Login Auth Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server error'
    });
  }
};
