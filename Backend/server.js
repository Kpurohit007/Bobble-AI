const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB config
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ' + err));

// Models
const User = require("./Models/User");

app.get("/", (req, res) => {
  res.send("AmbuFlow Server");
});

// Signup
app.post("/signup", [
  body("username").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(500).send('Error creating user: ' + err.message);
  }
});

// Login Route
app.post("/login", [
  body("username").isString().notEmpty(),
  body("password").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, JWT_token: token, id: user.id });
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err.message);
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
