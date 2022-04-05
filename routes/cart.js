const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Cart, validateCart } = require("../models/cart");
const { Category } = require("../models/category");

// !  ============ GET (ALL) ==========
router.get("/", async (req, res) => {
   const cart = await Cart.find().sort("title");
   res.send(cart);
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
   const { error } = validateCart(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const category = await Category.findById(req.body.categoryId);
   if (!category) return res.status(400).send("Id not found!");

   let cart = new Cart({
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
   cart = await cart.save();

   res.status(201).send(cart);
});

// !  ============ GET (ONE -> ID) ==========
router.get("/:id", async (req, res) => {
   const cart = await Cart.findById(req.params.id);
   if (!cart) return res.status(404).send("id not found check it again!");
   res.send(cart);
});

// !  ============ PUT (UPDATE) ==========
router.put("/:id", async (req, res) => {
   const { error } = validateCart(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   const category = await Category.findById(req.body.categoryId);
   if (!category)
      return res
         .status(400)
         .send("Berilgan IDga teng bo'lgan toifa topilmadi.");

   const cart = await Cart.findByIdAndUpdate(
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
      },
      { new: true }
   );

   if (!cart) return res.status(404).send("your id not found please check it");

   res.send(cart);
});

// !  ============ DELETE ==========
router.delete("/:id", async (req, res) => {
   const cart = await Cart.findByIdAndRemove(req.params.id);
   if (!cart)
      return res.status(404).send("id not fount check it again please !");
   res.send(cart);
});

module.exports = router;
