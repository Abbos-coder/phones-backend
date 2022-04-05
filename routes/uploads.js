const express = require("express");
const multer = require("multer");
const router = express.Router();

const { Files } = require("../models/upload");

const fileStorageEngine = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./images");
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
   },
});

const upload = multer({ storage: fileStorageEngine });

router.post("/", upload.single("image"), async (req, res) => {
   let files = new Files({
      productImg: req.file,
   });
   files = await files.save();

   res.send(files);
});

// ! GET all files
router.get("/", async (req, res) => {
   const files = await Files.find({});
   res.send(files);
});

module.exports = router;
