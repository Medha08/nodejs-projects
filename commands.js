#!/usr/bin/env node
//Shebang Line
const program = require("commander");

const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers
} = require("./index");

const { prompt } = require("inquirer");

program.version("0.1.0").description("Customer Management CLI");

// program
//   .command("add <firstName> <lastName> <email>")
//   .description("Add Customer")
//   .alias("a")
//   .action((firstName, lastName, email) => {
//     addCustomer({ firstName, lastName, email });
//   });

//Customer Questions

const ques = [
  {
    type: "input",
    name: "firstName",
    message: "Customer First Name ?"
  },
  {
    type: "input",
    name: "lastName",
    message: "Customer Last Name ?"
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email ?"
  }
];

program
  .command("add")
  .description("Add Customer")
  .alias("a")
  .action(() => {
    prompt(ques).then(answers => {
      addCustomer(answers);
    });
  });

program
  .command("find <name> ")
  .description("Find Customer")
  .alias("f")
  .action(name => {
    findCustomer(name);
  });

program
  .command("update <_id> ")
  .description("Update Customer")
  .alias("u")
  .action(_id => {
    prompt(ques).then(answers => {
      updateCustomer(_id, answers);
    });
  });

program
  .command("remove <_id> ")
  .description("Remove Customer")
  .alias("r")
  .action(_id => {
    removeCustomer(_id);
  });

program
  .command("list ")
  .description("List Customers")
  .alias("l")
  .action(() => {
    listCustomers();
  });

program.parse(process.argv);
