const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Phones, validatePhones } = require("../models/phone");
const { Category } = require("../models/category");

// !  ============ GET (ALL) ==========
router.get("/", async (req, res) => {
   const phones = await Phones.find().sort("title");
   res.send(phones);
});
// ! upload File

const fileStorageEngine = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./images");
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
   },
});

const upload = multer({ storage: fileStorageEngine });
// !  ============ POST (UPLOADE) ==========
router.post("/", upload.single("image"), async (req, res) => {
   const { error } = validatePhones(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const category = await Category.findById(req.body.categoryId);
   if (!category) return res.status(400).send("Id not found!");

   let phone = new Phones({
      title: req.body.title,
      category: {
         _id: category._id,
         name: category.name,
      },
      brand: req.body.brand,
      price: req.body.price,
      tags: req.body.tags,
      status: req.body.status,
      image: req.file,
   });
   phone = await phone.save();

   res.status(201).send(phone);
});

// !  ============ GET (ONE -> ID) ==========
router.get("/:id", async (req, res) => {
   const phone = await Phones.findById(req.params.id);
   if (!phone) return res.status(404).send("id not found check it again!");
   res.send(phone);
});

// !  ============ PUT (UPDATE) ==========
router.put("/:id", async (req, res) => {
   const { error } = validatePhones(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   const category = await Category.findById(req.body.categoryId);
   if (!category)
      return res
         .status(400)
         .send("Berilgan IDga teng bo'lgan toifa topilmadi.");

   const phone = await Phones.findByIdAndUpdate(
      req.params.id,
      {
         title: req.body.title,
         category: {
            _id: category._id,
            name: category.name,
         },
         brand: req.body.brand,
         tags: req.body.tags,
         status: req.body.status,
         image: req.file,
      },
      { new: true }
   );

   if (!phone) return res.status(404).send("your id not found please check it");

   res.send(phone);
});

// !  ============ DELETE ==========
router.delete("/:id", async (req, res) => {
   const phone = await Phones.findByIdAndRemove(req.params.id);
   if (!phone)
      return res.status(404).send("id not fount check it again please !");
   res.send(phone);
});

module.exports = router;
