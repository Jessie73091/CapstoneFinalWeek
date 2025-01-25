require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Loaded from .env
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET; // Loaded from .env

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend requests from this origin
app.use(bodyParser.json()); // Parse incoming JSON requests

// Route to handle Google OAuth login
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Verify the token using Google's OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); // Extract user details from the token
    const { sub, email, name, picture } = payload; // Extracted fields

    // Log user data for debugging (remove in production)
    console.log(`User authenticated: ${email}, ${name}`);

    // Respond with user details
    res.status(200).json({
      id: sub,
      email,
      name,
      picture,
    });
  } catch (err) {
    console.error('Error verifying token:', err.message);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
