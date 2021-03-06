import { Attachment, Attendee, Classification, Organizer, RecurrenceDate, Status, XProp } from '../general'
import { RRule } from 'rrule'

type Journal = {
    dtStamp: Date
    uid: string
    class?: Classification
    created?: Date
    start?: Date
    lastModified?: Date
    organizer?: Organizer
    recurId?: string
    sequence?: number
    status?: Status
    summary?: string
    url?: string
    rrule?: RRule
    attachments?: Attachment[]
    attendees?: Attendee[]
    categories?: string[]
    comment?: string
    contact?: string
    description?: string
    exDate?: Date
    related?: string
    rDate?: RecurrenceDate
    rStatus?: string
    xProps?: XProp[]
}

export default Journal
