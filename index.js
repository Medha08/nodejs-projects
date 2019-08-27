const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// connect to database
var db = mongoose
  .connect("mongodb://localhost/testdb", { useNewUrlParser: true })
  .then(() => {
    //console.log("Connected to Database");
  })
  .catch(err => {
    console.log("Not Connected to Database ERROR! ", err);
  });

const Customer = require("./models/customer");

//Add Customer

const addCustomer = customer => {
  Customer.create(customer).then(customer => {
    console.info("Customer Added");
  });
};

//Find Customer
const findCustomer = name => {
  //Make Case Insensitive
  var searchName = new RegExp(name, "i");
  Customer.find({
    $or: [{ firstName: searchName }, { lastName: searchName }]
  }).then(customer => {
    console.info(`Customer Found ${customer}`);
    console.info(`Customers ${customer.length} matches`);
  });
};

//Update Customer

const updateCustomer = (_id, customer) => {
  Customer.update({ _id }, customer).then(customer => {
    console.info("Customer Updated", customer);
  });
};

//Remove Customer

const removeCustomer = _id => {
  Customer.remove({ _id }).then(customer => {
    console.info("Customer Removed");
  });
};

//List Customer

const listCustomers = () => {
  Customer.find().then(customers => {
    console.info(customers);
    console.info(`${customers.length} cutomers`);
  });
};

module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers
};
