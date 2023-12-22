const express = require("express");
const router = express.Router();
const Reception = require("../models/reception_model");
const multer = require("multer");
const storage = multer.diskStorage({});
const User = require("../models/user");
const MedicalHistory = require("../models/medicalhistory");
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
router.get('/reception-dashboard', async (req, res) => {
  try {
    // Calculate the total number of users
    const userCount = await User.countDocuments();

    // Calculate the total search count for each user from the MedicalHistory model
    const searchCountsByUser = await MedicalHistory.aggregate([
      {
        $group: {
          _id: "$user",
          totalSearchCount: { $sum: "$searchCount" }
        }
      }
    ]);

    // Fetch user details and organize the data
    const searchCountsWithUserData = await Promise.all(searchCountsByUser.map(async (entry) => {
      const user = await User.findById(entry._id);
      return {
        userId: entry._id,
        username: user ? user.username : null, // Replace 'username' with the actual field in your User model
        totalSearchCount: entry.totalSearchCount
      };
    }));

    res.json({
      success: true,
      data: {
        userCount,
        searchCountsByUser: searchCountsWithUserData,
      }
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});


// get only user data 
router.get('/search', async (req, res) => {
  try {
    // Calculate the total search count from the MedicalHistory model
    const totalSearchCount = await MedicalHistory.aggregate([
      {
        $group: {
          _id: null,
          totalSearchCount: { $sum: "$searchCount" }
        }
      }
    ]);

    // Extract the total search count value
    const searchCount = totalSearchCount.length > 0 ? totalSearchCount[0].totalSearchCount : 0;

    res.json({
      success: true,
      data: {
        searchCount,
      }
    });
  } catch (error) {
    console.error('Error fetching search count:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});



router.get("/medical-history/searchCount/:receptionId", async (req, res) => {
  const { receptionId } = req.params;

  try {
    // Find the MedicalHistory by receptionId
    const medicalHistory = await MedicalHistory.findOne({ receptionId });

    // Log the retrieved medicalHistory
    console.log("Medical History:", medicalHistory);

    // Check if MedicalHistory exists
    if (!medicalHistory) {
      return res.status(404).json({ error: "MedicalHistory not found" });
    }

    // Extract the searchCount value
    const searchCount = medicalHistory.searchCount;

    // Log the searchCount value
    console.log("Search Count:", searchCount);

    // Send the searchCount value in the response
    res.json({ searchCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// router.get('/reception-dishboard', async (req, res) => {
//   try {
//     const userCount = await User.countDocuments();
   
//     res.json({
//       success: true,
//       data: {
//         userCount,
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching counts:', error);
//     res.status(500).json({ success: false, message: 'An error occurred.' });
//   }
// });

  module.exports = router;