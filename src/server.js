#!/usr/bin/env node

/* Dependencies */
import {
    createServer
} from 'http'
import debug from 'debug'
import config from './config/constants'
import {
    connect,
    options
} from './config/database'

/* App */
import app from './config/express'

// debuggers
const debugServer = debug('app_debug:server')
const debugDB = debug('app_debug:db')

/* App Port */
const port = normalizePort(config.appPort)
app.set('port', port)

/* Create HTTP Server */
const server = createServer(app)

/**
 * Attempt connect to db
 * Listen on provided port, on success
 */
connect(config.dbUrl, options)
    .then(() => {

        debugDB('Connected to MongoLab database')
        server.listen(port)

    })
    .catch(onConnectionError)

// server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {

    const port = parseInt(val, 10)
    if (isNaN(port)) {

        return val

    }
    if (port >= 0) {

        return port

    }
    return false

}

/**
 * Mongoose Error Event listener
 */
function onConnectionError(error) {

    console.error.bind(console, 'Error connecting MongoLab.')
    if (config.isDev) {

        console.error.bind(console, `Error: ${error.message}`)

    }
    process.exit(1)

}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {

    if (error.syscall !== 'listen') {

        throw error

    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port

    // handle specific listen errors with friendly messages
    /* eslint-disable indent */
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
        default:
            throw error
    }

}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {

    const addr = server.address()
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'http://localhost:' + addr.port
    debugServer('Listening on ' + bind)

}
