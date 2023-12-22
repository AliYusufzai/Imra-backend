const express = require("express");
const router = express.Router();
const SuperAdmin = require("../models/super_admin_model");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });
const User = require("../models/user");
const Reception = require("../models/reception_model");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");


const {
    createSuperAdmin,
    loginSuperadmin,
    deleteSingleAdmin,
    toggleActiveStatus,
    updateAdmin,
    getAllAdmins,
    getSingleAdmin
    } = require("../controllers/super_admin_controller");
  
    router.post(
      '/create-superadmin',
      upload.single("avatar"),
      createSuperAdmin
    );
    router.get('/dishboard', async (req, res) => {
      try {
        const userCount = await User.countDocuments();
        const DoctorCount = await Doctor.countDocuments();
        const recpCount = await Reception.countDocuments();
        const hospCount = await Hospital.countDocuments();
        Hospital
    
        res.json({
          success: true,
          data: {
            userCount,
            DoctorCount,
            recpCount,
            hospCount,
          }
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ success: false, message: 'An error occurred.' });
      }
    });
router.post('/login-superadmin',loginSuperadmin)
    module.exports = router;

    router.patch("/toggle-active-status/:adminId", toggleActiveStatus);
    router.patch(
      "/admin-update/:adminId",
      upload.single("avatar"),
      updateAdmin
  );
    //get api all admin.
  router.get("/all-admin",getAllAdmins)   
    //get api single  admin.
   router.get("/single-admin/:adminId",getSingleAdmin ),

   router.delete('/delete-admin/:adminId',deleteSingleAdmin)