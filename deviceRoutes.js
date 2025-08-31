// routes/deviceRoutes.js
import express from "express";
import { registerDevice, deleteDevice } from "../controllers/deviceController.js";

const router = express.Router();

// console.log("deviceRoutes loaded");

// Register device
router.post("/register-device", registerDevice);

// Delete device (by uuid)
router.delete("/delete-device", deleteDevice);

export default router;
