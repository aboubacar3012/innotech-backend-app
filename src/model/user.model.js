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
  intro: {
    type: String,
    default: "",
  },
  job: {
    type: String,
    default: "",
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
  gender: {
    type: String,
    default: "unknown",
    enum: ["man", "woman", "unknown"],
  },
  avatar: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    // default: generator.generate({ length: 10, numbers: true }),
  },
  batchList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batches",
    },
  ],
  role: {
    type: String,
    enum: ["admin", "student", "teacher", "assistant"],
    default: "student",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0,
  },
  country: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  isLevelOnePayed: {
    type: Boolean,
    default: false,
  },
  isLevelTwoPayed: {
    type: Boolean,
    default: false,
  },
  isLevelThreePayed: {
    type: Boolean,
    default: false,
  },
  isAlreadyCalled: {
    type: Boolean,
    default: false,
  },
  submitMessage: {
    type: String,
    default: "",
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

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("users", userSchema);
