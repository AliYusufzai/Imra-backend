const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Reception = require("../models/reception_model");
//const Hospital = require("../models/hospital");

router.get('/hospital-dishboard', async (req, res) => {
    try {
      const userCount = await User.countDocuments();
      //const hospitalCount = await Hospital.countDocuments();
      const recpCount = await Reception.countDocuments();
  
      res.json({
        success: true,
        data: {
          userCount,
          //hospitalCount,
          recpCount
        }
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
      res.status(500).json({ success: false, message: 'An error occurred.' });
    }
  });
  module.exports = router;