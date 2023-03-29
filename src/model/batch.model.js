const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  batchNumber: {
    type: Number,
    unique: true,
  },
  price: Number,
  startDate: String,
  stack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stacks",
    required: true,
  },
  campus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "campuses",
    required: true,
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["coming", "progress", "completed", "cancelled"],
    default: "coming",
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

batchSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("batches", batchSchema);
