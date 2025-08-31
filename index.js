import express from "express";
import mongoose from "mongoose";
import deviceRoutes from "./routes/deviceRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/attendanceDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Debug logs for API hits
app.use("/api", (req, res, next) => {
  console.log("API Route hit:", req.method, req.originalUrl);
  next();
});

// Mount grouped routes
app.use("/api/devices", deviceRoutes);       // 👉 /api/devices/register-device
app.use("/api/attendance", attendanceRoutes); // 👉 /api/attendance/mark-attendance

// Default route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Attendance API is running"
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
