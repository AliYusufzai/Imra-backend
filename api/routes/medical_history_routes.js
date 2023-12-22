const express = require("express");
const router = express.Router();
const MedicalHistory = require("../models/medicalhistory");
const MedicationHistory = require("../models/medicinehistory");
const  User= require("../models/user")
const {
    createMedicalHistory,
    createMedicationHistory
  } = require("../controllers/medical_history_controller");
  
router.post("/create-medicalhistory", createMedicalHistory);
router.post("/create-medicationhistory", createMedicationHistory);
router.get("/searc-hmedical-history/:userId", async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Fetch the medical history record by user ID
    const medicalHistoryRecord = await MedicalHistory.findOne({ user: userId });

    // Check if the record exists
    if (!medicalHistoryRecord) {
      return res.status(404).json({ error: "Medical history record not found" });
    }

    // Increment the search count
    medicalHistoryRecord.searchCount += 1;

    // Save the updated medical history record
    await medicalHistoryRecord.save();

    // Return the medical history record data as a JSON response
    res.status(200).json({ success: 1, data: medicalHistoryRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//single user all medical history
router.get("/all-medical-history/:userId", async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Fetch all medical history records for the user
    const medicalHistoryRecords = await MedicalHistory.find({ user: userId });

    // Check if any records exist
    if (medicalHistoryRecords.length === 0) {
      return res.status(404).json({ error: "No medical history records found for the user" });
    }

    // Return the medical history records data as a JSON response
    res.status(200).json({ success: 1, data: medicalHistoryRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// router.get("/medical-history/:userId", async (req, res) => {
//     try {
//       // Extract the medical history record ID from the request parameters
//       const userId = req.params.userId;
  
//       // Fetch the medical history record by its ID
//       const medicalHistoryRecord = await MedicalHistory.find({ user: userId });
//       medicalHistoryRecord.searchCount
//       console.log(userId);
//       console.log(medicalHistoryRecord);
//       // Check if the record exists
//       if (!medicalHistoryRecord) {
//         return res
//           .status(404)
//           .json({ error: "Medical history record not found" });
//       }
  
//       // Return the medical history record data as a JSON response
//       res.status(200).json({ "success ": 1, data: medicalHistoryRecord });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });


  //Get Medication history
  router.get("/medication-history/:userId", async (req, res) => {
    try {
      // Extract the medical history record ID from the request parameters
      const userId = req.params.userId;
  
      // Fetch the medical history record by its ID
      const medicationHistoryRecord = await MedicationHistory.find({
        user: userId
      });
      // Check if the record exists
      if (!medicationHistoryRecord) {
        return res
          .status(404)
          .json({ error: "Medication history record not found" });
      }
  
      // Return the medical history record data as a JSON response
      res.status(200).json({ "success ": 1, data: medicationHistoryRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.patch("/update-medical-history/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body; // Assuming the updated data is sent in the request body

        // Update the medical history record by its ID
        const updatedRecord = await MedicalHistory.findOneAndUpdate({ user: userId }, updatedData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ error: "Medical history record not found" });
        }

        res.status(200).json({ success: 1, data: updatedRecord ,message: "Medical history record update successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a medical history record by ID
router.delete("/delete-medical-history/:userId", async (req, res) => {
  try {
      const userId = req.params.userId;

      // Delete the medical history record by its ID
      const deletedRecord = await MedicalHistory.findOneAndDelete({ user: userId });

      if (!deletedRecord) {
          return res.status(404).json({ error: "Medical history record not found" });
      }

      res.status(200).json({ success: 1, data: deletedRecord, message: "Medical history record deleted successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" ,});
  }
});


//  search out

router.get("/search-count/:userId", async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Fetch the medical history record by user ID
    const medicalHistoryRecord = await MedicalHistory.findOne({ user: userId });

    // Check if the record exists
    if (!medicalHistoryRecord) {
      return res.status(404).json({ error: "Medical history record not found" });
    }

    // Return only the search count as a JSON response
    res.status(200).json({ success: 1, searchCount: medicalHistoryRecord.searchCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// new searchcount bi reception id

router.get("/search-reception/:userId/:receptionId", async (req, res) => {
  try {
    // Extract the user ID and reception ID from the request parameters
    const userId = req.params.userId;
    const receptionId = req.params.receptionId;

    // Fetch the medical history record by user ID and reception ID
    const medicalHistoryRecord = await MedicalHistory.findOne({ user: userId, reception: receptionId });

    // Check if the record exists
    if (!medicalHistoryRecord) {
      return res.status(404).json({ error: "Medical history record not found" });
    }

    // Return only the "searchCount" value as a JSON response
    res.status(200).json({ success: 1, searchCount: medicalHistoryRecord.searchCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  module.exports = router;