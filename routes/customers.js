const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer");

router.get("/", async (req, res) => {
   const customers = await Customer.find().sort("firstName");
   res.send(customers);
});

router.post("/", async (req, res) => {
   const { error } = validateCustomer(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let customer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
   });
   customer = await customer.save();

   res.status(201).send(customer);
});

router.get("/:id", async (req, res) => {
   let customer = await Customer.findById(req.params.id);
   if (!customer) return res.status(404).send("id not found check it again!");
   res.send(customer);
});

router.put("/:id", async (req, res) => {
   const { error } = validateCustomer(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
   );

   if (!customer)
      return res.status(404).send("your id not found please check it");

   res.send(customer);
});

router.delete("/:id", async (req, res) => {
   let customer = await Customer.findOneAndRemove(req.params.id);
   if (!customer)
      return res.status(404).send("id not fount check it again please !");
   res.send(customer);
});

module.exports = router;
