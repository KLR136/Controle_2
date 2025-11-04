const express = require('express');
const jwt = require('jsonwebtoken'); // N'oubliez pas d'installer: npm install jsonwebtoken
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  try {
    const existingUser = await req.models.User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    
    const newUser = await req.models.User.create({ username, password, email });
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await req.models.User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Vérification du mot de passe (à améliorer avec bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Génération du token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
    
    res.status(200).json({ 
      message: 'Login successful', 
      userId: user.id,
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;