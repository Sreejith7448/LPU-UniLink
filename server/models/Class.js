const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  classId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  code: String,
  faculty: String, // faculty regNo
  members: [{ type: String }] // regNo strings
}, { timestamps: true });

module.exports = mongoose.model('Class', ClassSchema);
