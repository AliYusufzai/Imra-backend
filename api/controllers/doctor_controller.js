const Doctor = require('../models/doctor');


const JWT_SECRET = "VERYsecret123";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});
exports.createDoctor = async (req, res) => {
    const { name, email, phonenumber,pdmaid,experience,qualification} = req.body;
  
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
  
    const doctor = await Doctor({
        name,
        email,
        phonenumber,
        pdmaid, 
        experience,
        qualification,
      Image: result.secure_url
    });
    await doctor.save();
    res.json({
      success: true,
      doctor
    });
  };

    // Delete Doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({ message: "Doctor deleted successfully", deletedDoctor });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};