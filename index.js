const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const getContactById = await contacts.getContactById(id);
      console.table(getContactById);
      break;

    case "add":
      const updateAllContacts = await contacts.addContact(name, email, phone);
      console.table(updateAllContacts);
      break;

    case "remove":
      const updateAllContactsAfterRemoveById = await contacts.removeContact(id);
      console.table(updateAllContactsAfterRemoveById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const start = async (argv) => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
};

start(argv);
