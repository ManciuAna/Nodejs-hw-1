const { Command } = require("commander");
const program = new Command();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { listContacts, addContact, removeContact } = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = listContacts().find((c) => c.id === id);
      if (contact) {
        console.log("Contact găsit:", contact);
      } else {
        console.log(`Contactul cu id-ul ${id} nu a fost găsit.`);
      }
      break;

    case "add":
      if (!name || !email || !phone) {
        console.log(
          "Te rog să furnizezi toate informațiile necesare (nume, email, telefon)."
        );
        return;
      }
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
      };
      addContact(newContact);
      console.log("Contact adăugat:", newContact);
      break;

    case "remove":
      const removed = removeContact(id);
      if (removed) {
        console.log("Contact șters cu succes");
      } else {
        console.log("Contactul nu a fost găsit.");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
