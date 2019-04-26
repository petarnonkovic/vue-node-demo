import mongoose from 'mongoose'
import config from '../../config/constants'
import {
    options,
    connect,
    disconnect
} from '../../config/database'

describe('Mongoose Connection', () => {

    it('Can open/close database connection', async () => {

        // attempt connecting
        await connect(config.dbUrl, options)

        // run assertion
        expect(mongoose.connection).toBeDefined()

        // attempt disconnect
        await disconnect()

        // run assertion
        expect(mongoose.connection.readyState).toEqual(0)

    })

})
