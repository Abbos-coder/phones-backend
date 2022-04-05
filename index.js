const express = require("express");
const app = express();
const categoriesRoute = require("./routes/categories");
const customersRoute = require("./routes/customers");
const phonesRoute = require("./routes/phones");
const cartRoute = require("./routes/cart");
const uploadRoute = require("./routes/uploads");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
   cors({
      origin: "*",
   })
);
mongoose
   .connect("mongodb://localhost/phones_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("connected to mongoDB database");
   })
   .catch((err) => {
      console.log("not connected mongoDB", err);
   });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static("images"));

app.use("/api/categories", categoriesRoute);
app.use("/api/customers", customersRoute);
app.use("/api/phones", phonesRoute);
app.use("/api/cart", cartRoute);
app.use("/api/upload", uploadRoute);

// ?  Server listening you
const port = 1998;
app.listen(port, () => {
   console.log(port, "server listening");
});
