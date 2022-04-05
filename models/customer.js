const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      default: "example24@gamil.com",
   },
   password: {
      type: String,
      required: true,
   },
   phoneNumber: {
      type: Number,
      required: true,
   },
});

function validateCustomer(customer) {
   const schema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
      phoneNumber: Joi.number().min(7).required(),
   });
   return schema.validate(customer);
}

const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
