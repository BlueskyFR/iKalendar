import ParsingError from '../../exceptions/parser.error'
import { Parameters } from '../../types/classes/parsers/property.parser'
import { Organizer } from '../../types/general'
import BaseParser from './base.parser'

const validParameters: Parameters = {
	'CN': 'cn',
	'DIR': 'dir',
	'SENT-BY': 'sentBy'
}

class OrganizerParser extends BaseParser<Organizer> {
    public parse(iCalValue: string): Organizer {
        let params: string
        let address: string
        let optionals: Parameters = {}

        if (!iCalValue.includes(':mailto:')) {
            [, address] = iCalValue.split(/mailto:/)
        } else if (!iCalValue.includes(';')) {
            const [param, addr] = iCalValue.split(/:(.+)?/)
            if (!param || !addr) {
                throw new ParsingError(`Invalid iCalendar organizer parameter in '${iCalValue}'`)
            }

            address = addr.split(/mailto:/)[1]

            const [type, value] = param.split(/=(.+)?/)

            if (!type || !value) {
                throw new ParsingError(`Invalid iCalendar organizer parameter in '${iCalValue}'`)
            }

            optionals[validParameters[type]] = value
        } else {
            [params, address] = iCalValue.split(/:mailto:/)

            optionals = this.parseParams(params, validParameters)
        }

		if (!address || !address.length) {
			throw new ParsingError(`Invalid iCalendar organizer address in: '${iCalValue}'`)
		}


		return {
			address,
			...optionals,
		}
    }
}

export default OrganizerParser
