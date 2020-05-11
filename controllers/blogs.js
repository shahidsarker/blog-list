const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  console.log(req.token);
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).end();
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? "0" : body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const loggedInId = decodedToken.id;
  const blog = await Blog.findById(req.params.id);
  if (loggedInId.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blog._id);
    res.send(204).end();
  } else {
    return res.status(401).json({ error: "invalid user" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
