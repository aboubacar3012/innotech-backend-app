const mongoose = require("mongoose");
const config = require('../utils/config')
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log("✅ Database connected successfully ✨✨");
    })
    .catch((error) => {
        console.log("❌Database is not connected❌", error);
    });