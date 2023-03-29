const mongoose = require("mongoose");

const stackSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  duration: Number,
  //   numberOfBatches: Number,
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

stackSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("stacks", stackSchema);
