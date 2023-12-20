const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({});
const Doctor = require("../models/doctor");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dzq1h0xyu",
    api_key: "345126432123499",
    api_secret: "cqCvcU_hqshoESszVszEnB5-D_8",
});
const { createDoctor,deleteDoctor,getDoctorById,getAllDoctors,updateDoctor } = require("../controllers/doctor_controller");

const upload = multer({ storage });

router.post("/create-doctor", upload.single("Image"), createDoctor);
router.delete("/delete-doctor/:doctorId", deleteDoctor) 
//Doctor  Get all doctor
router.get("/all-doctor",getAllDoctors ),  
// Doctor Get single doctor  api
router.get("/single-doctor/:doctorId",getDoctorById )
router.patch(
    "/update-doctor/:doctorId",
    upload.single("Image"),
    updateDoctor
   
);

router.get('/hospital-all-doc/:hospitalId', async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const doctors = await Doctor.find({ hospitalId });
      res.json({
        success: true,
        doctors,
        hospitalId, // Include hospitalId in the response
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
