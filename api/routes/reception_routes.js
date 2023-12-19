const express = require("express");
const router = express.Router();
const Reception = require("../models/reception_model");
const multer = require("multer");
const storage = multer.diskStorage({});

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



  module.exports = router;