require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // optional, your mock data has plaintext

const User = require('./models/User');
const ClassModel = require('./models/Class');
const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Mongo connected'))
  .catch(err => console.error('Mongo connection error', err));

// --- simple auth middleware ---
const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// --- routes ---

// Health
app.get('/api/health', (req,res)=> res.json({ ok: true }));

// Login (mock) -> issues JWT
app.post("/api/auth/login", async (req, res) => {
  const { regNo, password } = req.body;

  console.log("🔹 Login attempt:", { regNo, password });

  if (!regNo || !password) {
    console.log("❌ Missing regNo or password");
    return res.status(400).json({ error: "regNo and password required" });
  }

  try {
    const user = await User.findOne({ regNo });
    console.log("🔍 User found in DB:", user);

    if (!user) {
      console.log("❌ No user found for:", regNo);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("🧩 Comparing passwords:", { entered: password, stored: user.password });
    const match = user.password === password;

    if (!match) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { regNo: user.regNo, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    console.log("✅ Login successful:", { regNo: user.regNo, role: user.role });

    res.json({
      token,
      user: {
        regNo: user.regNo,
        name: user.name,
        role: user.role,
        classes: user.classes,
      },
    });
  } catch (err) {
    console.error("🔥 Server error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Get chats (classes) for logged in user
app.get('/api/chats', authMiddleware, async (req,res) => {
  const regNo = req.user.regNo;
  // find classes where the user is a member OR faculty is the user
  const classes = await ClassModel.find({
    $or: [{ members: regNo }, { faculty: regNo }]
  }).select('-__v').lean();

  // for UI, map to necessary chat data
  const chats = classes.map(c => ({
    id: c.classId,
    name: c.name,
    avatar: c.code ? c.code.split('-')[0] : c.classId,
    type: 'group',
    lastMessage: null,
    time: null,
    unread: 0
  }));

  // attach last message and time
  for (let i=0;i<chats.length;i++){
    const msg = await Message.findOne({ classId: chats[i].id }).sort({ createdAt: -1 }).lean();
    if (msg) {
      chats[i].lastMessage = msg.text;
      chats[i].time = msg.createdAt;
    }
  }

  res.json({ chats });
});

// Get messages for a class
app.get('/api/chats/:classId/messages', authMiddleware, async (req,res) => {
  const regNo = req.user.regNo;
  const classId = req.params.classId;

  // verify membership
  const cls = await ClassModel.findOne({ classId });
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  if (!cls.members.includes(regNo) && cls.faculty !== regNo) {
    return res.status(403).json({ error: 'Not a member of this class' });
  }

  const messages = await Message.find({ classId }).sort({ createdAt: 1 }).lean();
  res.json({ messages });
});

// Post a message to a class
app.post('/api/chats/:classId/messages', authMiddleware, async (req,res) => {
  const regNo = req.user.regNo;
  const classId = req.params.classId;
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });

  const cls = await ClassModel.findOne({ classId });
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  if (!cls.members.includes(regNo) && cls.faculty !== regNo) {
    return res.status(403).json({ error: 'Not a member of this class' });
  }

  const user = await User.findOne({ regNo });
  const message = new Message({
    classId,
    senderRegNo: regNo,
    senderName: user ? user.name : regNo,
    text,
    createdAt: new Date()
  });

  await message.save();
  res.json({ message });
});

app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
