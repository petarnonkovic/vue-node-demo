import mongoose from 'mongoose'
import formatDate from '../../utils/formatDate'

describe('Util | Helper | formatDate', () => {

    it('Should be defined formatDate helper function', () => {

        expect.assertions(1)
        expect(formatDate).toBeDefined()

    })

    it('Should return mongoose timestamp in formated string', () => {

        expect.assertions(1)
        const actual = formatDate(mongoose.now(), 'D-MMM-YY')
        const expected = '12-Apr-19'
        expect(expected).toEqual(actual)

    })

    it('Should format any valid Date() function response', () => {

        expect.assertions(1)
        const actual = formatDate(new Date(), 'D-MMM-YY')
        const expected = '12-Apr-19'
        expect(expected).toEqual(actual)

    })

})
