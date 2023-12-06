const express = require("express");
const router = express.Router();
const Hospital = require("../models/hospital");
const multer = require("multer");
const User = require("../models/user");
const Admin = require("../models/admin");
const cloudinary = require("cloudinary").v2;
const Question   = require('../models/QuestionModel');
const Answer = require('../models/AnswerModel');
const FoodAllergy = require('../models/foodAllergies');
const Country= require('../models/country_model')
const MyRoutine = require('../models/myroutineModel');

cloudinary.config({
  cloud_name: "dzq1h0xyu",
  api_key: "345126432123499",
  api_secret: "cqCvcU_hqshoESszVszEnB5-D_8"
});

const {
  createUser,
  userSignIn,
  createProfile,
  changePassword,
  singleUser,
  allUsers,
  deleteUser,
  userUpdate,
  // uploadProfile,
  signOut
} = require("../controllers/user");

const { isAuth } = require("../middlewares/auth");

const { response } = require("express");
const storage = multer.diskStorage({});
// const fileFilter = (req, file, cb) => {
//     if (!file.mimetype.startsWith("image")) {
//         return cb(new Error("Only image files are allowed"), false);
//     } else {
//         cb(null, true);
//     }
// };
const upload = multer({ storage });
// creat user api start
router.post(
  "/create-user",
  //upload.single('avatar'),
  // validateUserSignUp,
  // userVlidation,
  createUser
);
router.post("/sign-in", userSignIn);
router.post("/sign-out", isAuth, signOut);
// user single get api
router.get("/single-user/:userId", singleUser)
router.post("/reset-password", changePassword);
// creat user profile api start
router.post(
  "/create-profile/:userId",
  upload.single("avatar"),createProfile),
//get api all user.
router.get("/all-user",allUsers)
// delete api for user
router.delete("/delete-user/:id", deleteUser)
//user update profile
router.patch(
  "/userupdate/:userId",
  upload.single("avatar"),userUpdate)
module.exports = router;
