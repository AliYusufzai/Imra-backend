const Hospital = require('../models/hospital');


const JWT_SECRET = "VERYsecret123";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});
exports.createHospital = async (req, res) => {
    const { fullname, email, phonenumber,address,branch} = req.body;
  
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
  
    const hospital = await Hospital({
        fullname,
        email,
        phonenumber,
        address, 
        branch,
      avatar: result.secure_url
    });
    await hospital.save();
    res.json({
      success: true,
      hospital
    });
  };
// Get All Hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json({ hospitals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Single Hospital by ID
exports.getSingleHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json({ hospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//update
exports.updateHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const updatedData = req.body;

    // Process file upload if available
    if (req.file) {
      console.log("File received:", req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedData.avatar = result.secure_url;
    } else {
      console.log("No file received");
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      updatedData,
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    return res.status(200).json({ message: "Hospital updated successfully", updatedHospital });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Delete Hospital by ID
exports.deleteHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);

    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    return res.status(200).json({ message: "Hospital deleted successfully", deletedHospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


