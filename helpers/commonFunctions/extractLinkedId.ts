import type { Contact } from "../../generated/prisma/client";

export function extractLinkedIdFromPrimaryContact(contacts: Contact[]): number {
    for (let contact of contacts) {
        if (contact.linkPrecedence == "PRIMARY") {
            return contact.id
        }
    }
    return -1
}
