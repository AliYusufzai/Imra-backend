const MedicalHistory = require("../models/medicalhistory");
const MedicationHistory = require("../models/medicinehistory");
const User = require("../models/user");
const Reception = require("../models/reception_model");

//  exports.createMedicalHistory = async (req, res) => {
//   try {
//     // Assuming you have a 'userId' field in the request body to specify the user ID
//     const { userId,receptionId, ...medicalHistoryData } = req.body;

//     // Check if the user with the provided ID exists
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const medicalHistory = new MedicalHistory({
//       ...medicalHistoryData,
//       user: user._id, // Set the user reference
//     });

//     await medicalHistory.save();

//     // Return both the user ID and the medical history record in the response
//     res.status(201).json({
//       userId: user._id,
//       medicalHistory: medicalHistory.toJSON(),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
exports.createMedicalHistory = async (req, res) => {
    try {
        let medicalHistory;
        // Assuming you have 'userId' and 'receptionId' fields in the request body
        const { userId, receptionId, ...medicalHistoryData } = req.body;

        // Check if the user with the provided ID exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (receptionId) {
            const recp = await Reception.findById(receptionId);
            if (!recp) {
                return res
                    .status(404)
                    .json({ error: "Receptionist not found" });
            }
            medicalHistory = new MedicalHistory({
                ...medicalHistoryData,
                user: user._id,
                reception: recp._id,
            });
        } else {
            medicalHistory = new MedicalHistory({
                ...medicalHistoryData,
                user: user._id,
            });
        }
        await medicalHistory.save();

        // Return both the user ID, reception ID, and the medical history record in the response
        res.status(201).json({
            userId: user._id,
            receptionId: receptionId || null,
            medicalHistory: medicalHistory.toJSON(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//mdeication history
exports.createMedicationHistory = async (req, res) => {
    try {
        // Assuming you have a 'userId' field in the request body to specify the user ID
        const { userId, ...medicalHistoryData } = req.body;

        // Check if the user with the provided ID exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const medicationHistory = new MedicationHistory({
            ...medicalHistoryData,
            user: user._id, // Set the user reference
        });

        await medicationHistory.save();
        res.status(201).json(medicationHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
