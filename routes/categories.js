const express = require("express");
const router = express.Router();
const { Category, validateCategory } = require("../models/category");

router.get("/", async (req, res) => {
   const categories = await Category.find().sort("name");
   res.send(categories);
});

router.post("/", async (req, res) => {
   const { error } = validateCategory(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let category = new Category({
      name: req.body.name,
   });
   category = await category.save();

   res.status(201).send(category);
});

router.get("/:id", async (req, res) => {
   let category = await Category.findById(req.params.id);
   if (!category) return res.status(404).send("id not found check it again!");
   res.send(category);
});

router.put("/:id", async (req, res) => {
   const { error } = validateCategory(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
   );

   if (!category)
      return res.status(404).send("your id not found please check it");

   res.send(category);
});

router.delete("/:id", async (req, res) => {
   let category = await Category.findOneAndRemove(req.params.id);
   if (!category)
      return res.status(404).send("id not fount check it again please !");
   res.send(category);
});

module.exports = router;
