const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI);

const PostSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [PostSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!username) {
    return res.json({ message: "Username cannot be empty" });
  } else if (!email) {
    return res.json({ message: "Email cannot be empty" });
  } else if (!password) {
    return res.json({ message: "Password cannot be empty" });
  }

  const filteredUsername = await User.findOne({ username });
  const filteredEmail = await User.findOne({ email });
  if (filteredUsername || filteredEmail) {
    return res.json({ message: "Username or Email already taken" });
  }
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  const user = await User.findOne({ username });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token, message: "User Registered Succesfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.json({ message: "Username cannot be empty" });
  } else if (!password) {
    return res.json({ message: "Password cannot be empty" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token, message: "Login Successfully" });
});

app.get("/posts", async (req, res) => {
  const pages = req.query.pages;
  const posts = await Post.find().sort({ createdAt: -1 }).limit(pages).exec();
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const postId = req.params.id;
  const pages = req.query.pages;
  const posts = await Post.find().sort({ createdAt: -1 }).limit(pages).exec();
  const post = await Post.findById(postId);
  console.log(post);

  const getPost = [post, ...posts];
  res.json(getPost);
});

const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No Token Provided." });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.userId);
      console.log(req.headers.authorization);
      req.user = await User.findById({ _id: decoded.userId });
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid Token." });
    }
  }
  console.log("b");
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/post", verifyToken, upload.single("file"), async (req, res) => {
  const { title, location, description } = req.body;
  const user = req.user;

  const newPost = {
    img: `Images/${req.file.filename}`,
    title: title,
    location: location,
    description: description,
  };

  user.posts.push(newPost);
  await user.save();

  const posts = new Post(newPost);
  await posts.save();

  console.log(user);
  res.status(201).json({ message: "Post added successfully" });
});

app.post("/post/:id?", async (req, res) => {
  const postId = req.params.id;
  const like = req.query.like;

  try {
    const post = await Post.findById(postId);
    post.like = like === "true"? post.like += 1: post.like -= 1;
    const updatedDocument = post.save();
  } catch (Err) {
    console.log(Err);
  }

  res.json({ message: "Liked" });
});

app.get("/user", verifyToken, async (req, res) => {
  console.log(req.headers.authorization);
  const user = req.user;
  console.log(user);
  res.json(user);
});

app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
