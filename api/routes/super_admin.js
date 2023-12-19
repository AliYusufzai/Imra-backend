const express = require("express");
const router = express.Router();
const SuperAdmin = require("../models/super_admin_model");
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage });

const {
    createSuperAdmin,
    } = require("../controllers/super_admin_controller");
  
    router.post(
      '/create-superadmin',
      upload.single("avatar"),
      createSuperAdmin
    );
    module.exports = router;