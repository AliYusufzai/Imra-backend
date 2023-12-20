const jwt = require("jsonwebtoken");
const Reception = require("../models/reception_model");
const Hospital = require("../models/hospital");
const bcrypt = require('bcrypt');
// const {cloudinary} = require('../middlewares/clouddary')

const JWT_SECRET = "VERYsecret123";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});

// for reception
exports.createreception = async (req, res) => {
  const { name, email, phonenumber, password, address,avatar,hospitalId
    } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }
  const result = await cloudinary.uploader.upload(req.file.path);
  const existingRecp = await Reception.findOne({ email });

if (existingRecp) {
  return res.status(400).json({
    success: false,
    message: "Email already exists. Please use a different email."
  });
}
const hosp = await Hospital.findById(hospitalId);
const recption = await Reception({
 hospitalId:hosp._id,
  name,
  email,
  phonenumber,
  password,
 address,
  avatar: result.secure_url
});

await recption.save();
res.json({
  success: true,
  recption
});
}


exports.loginreception = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingRecp = await Reception.findOne({ email });

    if (!existingRecp) {
      return res.status(404).json({
        success: false,
        message: 'Receptionist not found. Please check your email.',
      });
    }

    const isPasswordValid = await existingRecp.comparepassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please try again.',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: existingRecp._id, email: existingRecp.email },
      JWT_SECRET, // Your secret key
      { expiresIn: '1h' } // Token expiration time
    );

    // Log in successful
    res.json({
      success: true,
      message: 'Login successful',
      token,
      reception: {
        _id: existingRecp._id, 
        name: existingRecp.name,
        email: existingRecp.email,
        avatar: existingRecp.avatar,
        phonenumber: existingRecp.phonenumber,
        address: existingRecp.address,
        // Add other fields as needed
      },
    });
  } catch (error) {
    console.error('Error logging in receptionist:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




exports.singlerecption = async (req, res) => {
  try {
    const { receptionId } = req.params;

    const reception = await Reception.findById(receptionId,"-password -tokens");

    if (!reception) {
      return res.status(404).json({
        success: false,
        message: 'Receptionist not found.',
      });
    }

    res.json({
      success: true,
      reception,
    });
  } catch (error) {
    console.error('Error retrieving single receptionist:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.allrecption = async (req, res) => {
  try {
    const receptions = await Reception.find();

    res.json({
      success: true,
      receptions,
    });
  } catch (error) {
    console.error('Error retrieving all receptionists:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.Receptiondelete = async (req, res) => {
  try {
    const { receptionId } = req.params;

    const deletedReception = await Reception.findByIdAndDelete(receptionId);

    if (!deletedReception) {
      return res.status(404).json({
        success: false,
        message: 'Receptionist not found.',
      });
    }

    res.json({
      success: true,
      message: 'Receptionist deleted successfully',
      reception: deletedReception,
    });
  } catch (error) {
    console.error('Error deleting receptionist:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//update
exports.updateReception = async (req, res) => {
  try {
    const { receptionId } = req.params;
    const updatedData = req.body;

    // Process file upload if available
    if (req.file) {
      console.log("File received:", req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedData.avatar = result.secure_url;
    } else {
      console.log("No file received");
    }

    const updatedReception = await Reception.findByIdAndUpdate(
      receptionId,
      updatedData,
      { new: true }
    );

    if (!updatedReception) {
      return res.status(404).json({ message: "Receptionist not found" });
    }

    return res.status(200).json({ message: "Receptionist updated successfully", updatedReception });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// exports.loginreception = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existingRecp = await Reception.findOne({ email });

//     if (!existingRecp) {
//       return res.status(404).json({
//         success: false,
//         message: 'Receptionist not found. Please check your email.',
//       });
//     }

//     const isPasswordValid = await existingRecp.comparepassword(password);

//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid password. Please try again.',
//       });
//     }

//     // Log in successful
//     res.json({
//       success: true,
//       message: 'Login successful',
//       reception: {
//         name: existingRecp.name,
//         email: existingRecp.email,
//         avatar: existingRecp.avatar,
//         phonenumber: existingRecp.phonenumber,
//         address: existingRecp.address

//         // Add other fields as needed
//       },
//     });
//   } catch (error) {
//     console.error('Error logging in receptionist:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };