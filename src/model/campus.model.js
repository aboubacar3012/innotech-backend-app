const mongoose = require("mongoose");

const campusSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: String,
  city: String,
  isOpen: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
});

campusSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("campuses", campusSchema);
