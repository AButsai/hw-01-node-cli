const { v4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(data);
    if (allContacts.length !== 0) {
      return allContacts;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    if (allContacts.length !== 0) {
      return [...allContacts].filter(({ id }) => id === contactId);
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();
    if (allContacts.length !== 0) {
      const filterContact = [...allContacts].filter(
        ({ id }) => id !== contactId
      );
      const updateContacts = JSON.stringify(filterContact);
      fs.writeFile(contactsPath, updateContacts, (err) => err);
      return filterContact;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (name, email, phone) => {
  const id = v4();

  try {
    const allContacts = await listContacts();
    if (allContacts.length !== 0) {
      for (const contact of allContacts) {
        if (contact.name === name || contact.email === email) {
          throw new Error(400);
        }
      }
      const updateContacts = [...allContacts, { id, name, email, phone }];
      const updateContactsJSONStringify = JSON.stringify(updateContacts);
      fs.writeFile(contactsPath, updateContactsJSONStringify, (err) => err);
      return updateContacts;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
