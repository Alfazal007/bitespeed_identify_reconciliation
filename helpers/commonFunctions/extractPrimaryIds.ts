import type { Contact } from "../../generated/prisma/client";

export function extractPrimaryIds(contacts: Contact[]): { olderId: number, newerId: number | null } {
    let res: { olderId: number, newerId: number | null } = {
        olderId: -1,
        newerId: null
    }
    for (let contact of contacts) {
        if (contact.linkPrecedence == "PRIMARY") {
            if (res.olderId == -1) {
                res.olderId = contact.id
            } else {
                res.newerId = contact.id
            }
        }
    }
    return res
}
