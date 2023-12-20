const express = require("express");
const router = express.Router();
const SuperAdmin = require("../models/super_admin_model");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });

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