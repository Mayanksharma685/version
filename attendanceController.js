import DeviceMapping from "../models/deviceMapping.js";


export const markAttendance = async (req, res) => {
  try {
    const { uuid, device_fingerprint, user_id } = req.body;

    const device = await DeviceMapping.findOne({ uuid, device_fingerprint, user_id });

    if (!device || device.device_type !== "mobile") {
      return res.status(400).json({
        status: "error",
        message: "Attendance can only be marked from your registered mobile device."
      });
    }

    device.last_seen = new Date();
    await device.save();

    res.json({
      status: "success",
      message: "Attendance marked successfully",
      data: { user_id, last_seen: device.last_seen }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
