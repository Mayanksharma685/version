// controllers/deviceController.js
import DeviceMapping from "../models/deviceMapping.js";

// Register Device
export const registerDevice = async (req, res) => {
  try {
    const { uuid, device_fingerprint, user_id , platform, device_type } = req.body;

    if (!uuid || !device_fingerprint || !user_id || !platform) {
      return res.status(400).json({
        status: "error",
        message: "All required fields must be provided",
      });
    }

    // Restrict one mobile device per user
    if (device_type === "mobile") {
      const userHasMobile = await DeviceMapping.findOne({ user_id, device_type: "mobile" });
      if (userHasMobile) {
        return res.status(400).json({
          status: "error",
          message: "User already has a registered mobile device. Delete it before adding a new one.",
        });
      }
    }

    //  Prevent duplicate device
    const deviceExists = await DeviceMapping.findOne({ uuid, device_fingerprint });
    if (deviceExists) {
      return res.status(400).json({
        status: "error",
        message: "This device is already registered.",
      });
    }

    // Save new device
    const device = new DeviceMapping({
      uuid,
      device_fingerprint,
      user_id,
      platform,
      device_type,
    });

    await device.save();

    res.json({
      status: "success",
      message: "Device registered successfully",
      data: device,
    });
  } catch (err) {
    console.error("Error registering device:", err);
    res.status(500).json({
      status: "error",
      message: "Server error while registering device",
    });
  }
};

//  Delete Device for a user
export const deleteDevice = async (req, res) => {
  try {
    const { uuid } = req.body;  // get user_id from request body

    if (!uuid) {
      return res.status(400).json({
        status: "error",
        message: "user_id is required to delete device",
      });
    }

    const deleted = await DeviceMapping.findOneAndDelete({ uuid , device_fingerprint});

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "No device found for this user",
      });
    }

    res.json({
      status: "success",
      message: "Device (uuid + fingerprint) deleted successfully for this user",
    });
  } catch (err) {
    console.error("Error deleting device:", err);
    res.status(500).json({
      status: "error",
      message: "Server error while deleting device",
    });
  }
};
