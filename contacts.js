const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const contactsFilePath = "./db/contacts.json";

function listContacts() {
  try {
    const data = fs.readFileSync(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Eroare la citirea fișierului de contacte:", err);
    return [];
  }
}

function addContact({ name, email, phone }) {
  try {
    const contacts = listContacts();
    const existingContact = contacts.find(
      (contact) => contact.name === name && contact.email === email
    );

    if (existingContact) {
      console.log("Contactul există deja!");
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    fs.writeFileSync(
      contactsFilePath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    console.log("Contact adăugat cu succes:", newContact);
  } catch (err) {
    console.error("Eroare la adăugarea contactului:", err);
  }
}

function removeContact(contactId) {
  try {
    let contacts = listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const [removedContact] = contacts.splice(contactIndex, 1);
      fs.writeFileSync(
        contactsFilePath,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      console.log("Contact șters:", removedContact);
    } else {
      console.log("Contactul nu a fost găsit.");
    }
  } catch (err) {
    console.error("Eroare la ștergerea contactului:", err);
  }
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
};
