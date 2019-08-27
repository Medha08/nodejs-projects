const mongoose = require("mongoose");

// create a schema def

const customer = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String }
});

// export Model

module.exports = mongoose.model("Customer", customer);
