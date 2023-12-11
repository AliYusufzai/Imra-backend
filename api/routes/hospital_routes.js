const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");
const multer = require("multer");
const storage = multer.diskStorage({});

const upload = multer({ storage });

const { createHospital, getAllHospitals,getSingleHospital,updateHospital,deleteHospital } = require("../controllers/hospital");

router.post("/create-hospital",
  upload.single("avatar"),
createHospital);
//get api all hospital.
router.get("/all-hospitals",getAllHospitals)
  
  //get single hospital
  router.get("/hospital/:hospitalId",getSingleHospital) 
  

  //Update api hospital
router.patch('/update-hospital/:hospitalId', upload.single('avatar'),updateHospital )

  
  ///Delete api hospital
router.delete("/delete-hospital/:hospitalId", deleteHospital)


  module.exports = router;