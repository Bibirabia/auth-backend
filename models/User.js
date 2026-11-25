const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    bio: { type: String, default: "", maxlength: 160 },
    phone: { type: String, default: "" },
    loginCount: { type: Number, default: 0 },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true } // adds createdAt + updatedAt
);

module.exports = mongoose.model("User", userSchema);
