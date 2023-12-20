const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/super_admin_model");
const bcrypt = require('bcrypt');
const JWT_SECRET = "VERYsecret123";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});


exports.createSuperAdmin = async (req, res) => {
  const { fullname, email, phonenumber, password, type, title ,
    addHospital,manageHospital,addAdmin,manageAdmin,services,is_active,reception,manageUser,add_doctor,
    manage_doctor ,avatar,
    dashboard,} = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  const existingsuperadmin = await SuperAdmin.findOne({ email });

if (existingsuperadmin) {
  return res.status(400).json({
    success: false,
    message: "Email already exists. Please use a different email."
  });
}

const superAdm = await SuperAdmin({
    fullname,
    email,
    phonenumber,
    password,
    type,
    title,
    addHospital,
    manageHospital,
    addAdmin,
    services,
    reception,
    manageUser,
    manageAdmin,
    add_doctor,
    manage_doctor,
    dashboard,
    is_active,
    avatar: result.secure_url
});

await superAdm.save();
res.json({
  success: true,
  superAdm
});


}

exports.loginSuperadmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingsuperadmin = await SuperAdmin.findOne({ email });

    if (!existingsuperadmin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found. Please check your email.',
      });
    }

    const isPasswordValid = await existingsuperadmin.comparepassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please try again.',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: existingsuperadmin._id, email: existingsuperadmin.email },
      JWT_SECRET, // Your secret key
      { expiresIn: '1h' } // Token expiration time
    );

    // Log in successful
    res.json({
      success: true,
      message: 'Login successful',
      token,
      Admin: {
        _id: existingsuperadmin._id, 
        name: existingsuperadmin.name,
        email: existingsuperadmin.email,
        avatar: existingsuperadmin.avatar,
        phonenumber: existingsuperadmin.phonenumber,
        address: existingsuperadmin.address,
        // Add other fields as needed
      },
    });
  } catch (error) {
    console.error('Error logging in receptionist:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await SuperAdmin.find({}, "-password -tokens");
    res.status(200).json({ admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Single Admin by ID
exports.getSingleAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await SuperAdmin.findById(adminId, "-password -tokens");

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to toggle admin's is_active status
exports.toggleActiveStatus = async (req, res) => {
  const { adminId } = req.params;
  try {
    const inactive_admin = await SuperAdmin.findById(adminId);
    console.log(inactive_admin);
    if (!inactive_admin) {
      return res.status(404).json({ message: "there is no admin found" });
    }
    inactive_admin.is_active = !inactive_admin.is_active;
    await inactive_admin.save();
    res.status(200).json(inactive_admin);
  } catch (error) {
    res.status(500).json({
      message: "An error occured ",
      error: error.message
    });
  }
};


exports.updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const updatedData = req.body;

    // Process file upload if available
    if (req.file) {
      console.log("File received:", req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedData.avatar = result.secure_url;
    } else {
      console.log("No file received");
    }

    const updatedAdmin = await SuperAdmin.findByIdAndUpdate(
      adminId,
      updatedData,
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};


exports.deleteSingleAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await SuperAdmin.findByIdAndDelete(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}