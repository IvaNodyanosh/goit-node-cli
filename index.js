const contactsFunction = require("./contacts.js");
const program = require('commander').program;

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsFunction.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await contactsFunction.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contactsFunction.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contactsFunction.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
