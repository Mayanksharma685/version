// models/deviceMapping.js
import mongoose from "mongoose";

const deviceMappingSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  device_fingerprint: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platform: {
  type: String,
  enum: ["ios", "android", "windows", "mac", "linux"],
  required: true,
  lowercase: true,   // normalizes "Android" → "android"
  trim: true,        // removes spaces
},
device_type: {
  type: String,
  enum: ["mobile", "laptop", "desktop", "tablet"],
  default: "mobile",
  lowercase: true,
  trim: true,
},
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_seen: {
    type: Date,
    default: Date.now,
  },
});

// Update last_seen whenever saving
deviceMappingSchema.pre("save", function (next) {
  this.last_seen = new Date();
  next();
});

export default mongoose.model("DeviceMapping", deviceMappingSchema);
