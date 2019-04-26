import mongoose from 'mongoose'
import Promise from 'bluebird'

export const options = {
    useNewUrlParser: true,
    promiseLibrary: Promise,
    useCreateIndex: true,
    poolSize: 10
}

/**
 * Connect to MongoLab DB
 */
export const connect = (url, options) => {

    return new Promise(async (resolve, reject) => {

        try {

            await mongoose.connect(url, options)
            return resolve()

        } catch (error) {

            reject(error)

        }

    })

}

/**
 * Disconnect from MongoLab
 */
export const disconnect = async () => {

    await mongoose.connection.close()

}
