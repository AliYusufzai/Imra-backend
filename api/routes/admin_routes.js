// const express = require("express");
// const router = express.Router();
// const Admin = require("../models/admin");
// const multer = require("multer");
// const storage = multer.diskStorage({});
// const upload = multer({ storage });
// const {
//     createAdmin,
//     adminSignIn,
//     createHospitalAdmin,
//     createReception,
//     toggleActiveStatus,
//     updateAdmin,
//     getAllAdmins,
//     getSingleAdmin
//   } = require("../controllers/admin");


//   router.patch("/toggle-active-status/:adminId", toggleActiveStatus);
//   router.post(
//     "/create-superadmin",
//     upload.single("avatar"),
//     //validateUserSignUp,
//     //userVlidation,
//     createAdmin
//   );
//   router.patch("/toggle-active-status/:adminId", toggleActiveStatus);
//   router.patch(
//     "/admin-update/:adminId",
//     upload.single("avatar"),
//     updateAdmin
// );
//   //get api all admin.
// router.get("/all-admin",getAllAdmins)   
//   //get api single  admin.
//  router.get("/single-admin/:adminId",getSingleAdmin )
  

//   router.post(
//     "/create-hospitaladmin",
//     // validateUserSignUp,
//     // userVlidation,
//     createHospitalAdmin
//   );
//   router.post(
//     "/create-hospital-recept",
//     // validateUserSignUp,
//     // userVlidation,
//     createReception
//   );

// router.post("/sign-in-admin", adminSignIn);



//   module.exports = router;