const mongoose = require("mongoose");
const generator = require("generate-password");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: generator.generate({ length: 10, numbers: true }),
  },
  batchList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batches",
    },
  ],
  role: {
    type: String,
    enum: ["admin", "student", "teacher"],
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("users", userSchema);
