const express = require("express");
const router = express.Router();
const Reception = require("../models/reception_model");
const multer = require("multer");
const storage = multer.diskStorage({});
const User = require("../models/user");
const upload = multer({ storage });
const {
  createreception,
  loginreception,
  Receptiondelete,
  allrecption,
  singlerecption,
  updateReception
  } = require("../controllers/reception_controller");

  router.post(
    '/create-reception',
    upload.single("avatar"),
    createreception
  );

   router.post('/reception-login',loginreception),
   router.get('/single-reception/:receptionId', singlerecption); // Retrieve a single receptionist
   router.get('/all-receptions', allrecption); // Retrieve all receptionists
   router.delete('/delete-receptions/:receptionId', Receptiondelete);
   router.patch(
    "/recption-update/:receptionId",
    upload.single("avatar"),
    updateReception
);

router.get('/reception-dishboard', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
   
  
    res.json({
      success: true,
      data: {
        userCount,
      }
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

  module.exports = router;