const mongoose = require("mongoose");

// Replace this with your MONGOURI.

const connection = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri, {
      useUnifiedTopology :true,
      useNewUrlParser :true
    });
    console.log("connection succeed");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

connection()
// module.exports = connection;
