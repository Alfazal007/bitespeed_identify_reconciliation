import type { Contact } from "../../generated/prisma/client";

export function contactResponseReturner(contacts: Contact[]) {
    let primaryId: number = -1
    let secondaryIds: number[] = []
    let emails: string[] = []
    let phoneNumbers: string[] = []

    for (const curContact of contacts) {
        if (curContact.linkPrecedence == "PRIMARY") {
            primaryId = curContact.id
        } else if (!secondaryIds.includes(curContact.id)) {
            secondaryIds.push(curContact.id)
        }
        if (curContact.email && !emails.includes(curContact.email)) {
            emails.push(curContact.email)
        }
        if (curContact.phoneNumber && !phoneNumbers.includes(curContact.phoneNumber)) {
            phoneNumbers.push(curContact.phoneNumber)
        }
    }

    return {
        "contact": {
            "primaryContatctId": primaryId,
            "emails": emails,
            "phoneNumbers": phoneNumbers,
            "secondaryContactIds": secondaryIds
        }
    }
}
