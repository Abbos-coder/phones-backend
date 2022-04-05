const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
});

function validateCategory(category) {
   const schema = Joi.object({
      name: Joi.string().min(2).required(),
   });
   return schema.validate(category);
}

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.validateCategory = validateCategory;
exports.categorySchema = categorySchema;
