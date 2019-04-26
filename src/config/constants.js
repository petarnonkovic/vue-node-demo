import dotenv from 'dotenv'
import path from 'path'
// load environment variables
dotenv.config()

/**
 * Export variables
 */
const appEnv = {

    'production': {
        dbUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds135796.mlab.com:35796/${process.env.DB_NAME}`
    },

    'development': {
        dbUrl: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds135796.mlab.com:35796/${process.env.DB_NAME}`
    },

    'test': {
        dbUrl: `mongodb://${process.env.DB_USER_TEST}:${process.env.DB_PASSWORD_TEST}@ds135786.mlab.com:35786/${process.env.DB_NAME_TEST}`,
        app_src: path.resolve(__dirname, '../../', 'src')
    }

}

let environment = appEnv[process.env.NODE_ENV]

environment = {
    ...environment,
    appPort: process.env.PORT || 8080,
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test'
}

export default environment
