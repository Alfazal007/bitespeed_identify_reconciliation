import type { Contact } from "../../generated/prisma/client";

export function newInformationExists(contacts: Contact[], email: string | undefined | null, phoneNumber: string | undefined | null): boolean {
    let emailExists = false
    let phoneNumberExists = false
    if (!email) {
        emailExists = true
    }
    if (!phoneNumber) {
        phoneNumberExists = true
    }

    for (let contact of contacts) {
        if (email && contact.email && contact.email == email) {
            emailExists = true
        }
        if (phoneNumber && contact.phoneNumber && contact.phoneNumber == phoneNumber) {
            phoneNumberExists = true
        }
    }
    return !(emailExists && phoneNumberExists)
}
