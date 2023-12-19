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