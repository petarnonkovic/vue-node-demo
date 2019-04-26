import express from 'express'
import path from 'path'
import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import methodOverride from 'method-override'
import config from './constants'
import readFileContent from '../utils/readFile'

/**
 * app routes import
 */
import taskRouter from '../routes/api/task.router'

/**
 * Express app instance
 */
const app = express()

/**
 * app config middleware
 */
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(helmet())
app.use(compression())

/**
 * app routes register
 */

app.use('/api/tasks', taskRouter)

/**
 *  In Production
 * Setup static files dir path
 * Cache requests and redirect to index.html
 */
if (config.isProd) {

    // serve static
    app.use(express.static(path.resolve(__dirname, '../public')))
    // serve SPA index.html
    app.use('*', async (req, res, next) => {

        return res.send(await readFileContent(path.resolve(__dirname, '../public/index.html').catch(next)))

    })

}

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res, next) => {

    const err = new Error('Not Found')
    err.status = 404
    next(err)

})

/**
 * Error Handler
 */
app.use((err, req, res, next) => {

    const status = err.status || 500
    const message = err.message || 'Service Unavailable'

    const response = {
        status: status,
        errors: [`${message}`]
    }

    if (config.isDev) {

        response.error = err

    }

    res.status(status).json(response)

})

export default app
