const express = require("express");

const app = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();
require("./config/db");

const Message = require("./models/Message");
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.json());
app.get("/cv", (req, res) => {
  const cv = path.join(__dirname, "Public", "files", "my_resume.pdf");
  let file = fs.createReadStream(cv);
  let stat = fs.statSync(cv);
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Owen's_resume.pdf"
  );
  file.pipe(res);
});
app.post("/message", async (req, res) => {
  const { name, email, message, title } = req.body;
  if (!name || !email || !message || !title) {
    return res
      .status(400)
      .json({ msg: "You must provide name, title, email and message" });
  }
  await Message.create({
    name,
    title,
    email,
    message,
  });
  res.status(201).json({
    msg: "Your message has been saved, I'll get to you as soon as possible",
  });
});
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
