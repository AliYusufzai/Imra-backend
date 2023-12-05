const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
// const {cloudinary} = require('../middlewares/clouddary')

const JWT_SECRET = "VERYsecret123";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});

// for super admin
exports.createAdmin = async (req, res) => {
  const { fullname, email, phonenumber, password, type, title ,
    addHospital,manageHospital,addAdmin,manageAdmin,services,is_active,reception,manageUser,add_doctor,
    manage_doctor ,
    dashboard,} = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }
  const result = await cloudinary.uploader.upload(req.file.path);

  const admin = await Admin({
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
    manage_doctor ,
    dashboard,
    is_active,
    avatar: result.secure_url
  });
  await admin.save();
  res.json({
    success: true,
    admin
  });
};

//get all admin

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password -tokens");
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

    const admin = await Admin.findById(adminId, "-password -tokens");

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//for hospital admin
exports.createHospitalAdmin = async (req, res) => {
  const { fullname, email, phonenumber, password, type } = req.body;
  const isNewAdmin = await Admin.isThisEmailInUse(email);
  if (!isNewAdmin)
    return res.json({
      success: false,
      message: "This email is already in use ,try sing-in"
    });
  const admin = await Admin({
    fullname,
    email,
    phonenumber,
    password,
    type
  });
  await admin.save();
  res.json({
    success: true,
    admin
  });
};
// hospital reception

exports.createReception = async (req, res) => {
  const { fullname, email, phonenumber, password, type } = req.body;
  const isNewAdmin = await Admin.isThisEmailInUse(email);
  if (!isNewAdmin)
    return res.json({
      success: false,
      message: "This email is already in use ,try sing-in"
    });
  const admin = await Admin({
    fullname,
    email,
    phonenumber,
    password,
    type
  });
  await admin.save();
  res.json({
    success: true,
    admin
  });
};

//for login
exports.adminSignIn = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin)
    return res.json({
      success: false,
      message: "admin not found, with the given email!"
    });

  const superAdmin = admin.type === 1;
  const hospitalAdmin = admin.type === 2;
  const reception = admin.type === 3;
  const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
    expiresIn: "1d"
  });

  let oldTokens = admin.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await Admin.findByIdAndUpdate(admin._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }]
  });

  const adminInfo = {
    id: admin._id,
    fullname: admin.fullname,
    email: admin.email,
    phonenumber: admin.phonenumber,
    superAdmin,
    hospitalAdmin,
    reception,
    avatar: admin.avatar ? admin.avatar : ""
  };

  res.json({
    success: 1,
    message: "login successfully",
    data: adminInfo,
    token
  });
};
//const Admin = require('../models/Admin');

// Controller method to toggle admin's is_active status
exports.toggleActiveStatus = async (req, res) => {
  const { adminId } = req.params;
  try {
    const inactive_admin = await Admin.findById(adminId);
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

    const updatedAdmin = await Admin.findByIdAndUpdate(
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
