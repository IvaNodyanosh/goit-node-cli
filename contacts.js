const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  let contact = null;

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === contactId) {
      contact = contacts.splice(i, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    }
  }

  return contact[0];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  let contact = { id: nanoid(), name, email, phone };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contact;
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};