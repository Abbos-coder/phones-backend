const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
   {
      productImg: {
         type: Object,
         //  required: true,
      },
   },
   { timestamps: true }
);

const Files = mongoose.model("Files", fileSchema);
exports.Files = Files;
