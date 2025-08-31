// routes/attendanceRoutes.js
import express from "express";
import { markAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

// Debug log for every request on attendance routes
router.use((req, res, next) => {
  console.log("Attendance route hit:", req.method, req.originalUrl);
  next();
});

router.post("/mark-attendance", (req, res) => {
  console.log(" /mark-attendance POST route triggered with body:", req.body);
  markAttendance(req, res);
});

export default router;
