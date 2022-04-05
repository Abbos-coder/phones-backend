const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./category");

const phoneSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
   },
   category: {
      type: categorySchema,
      required: true,
   },
   brand: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
      default: 0,
   },
   tags: {
      type: [String],
   },
   status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
   },
   image: {
      type: Object,
      default: "",
   },
});

function validatePhones(phone) {
   const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      categoryId: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required(),
      tags: Joi.array().items(Joi.string()),
      status: Joi.string().required(),
      // image: Joi.object(),
   });
   return schema.validate(phone);
}

const Phone = mongoose.model("Phones", phoneSchema);

exports.Phones = Phone;
exports.validatePhones = validatePhones;
