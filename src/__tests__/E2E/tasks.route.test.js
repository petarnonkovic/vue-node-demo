// import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../config/express'
import Task from '../../models/Task'
import {
    options,
    connect,
    disconnect
} from '../../config/database'
import config from '../../config/constants'
import toString from 'lodash/toString'

beforeAll(async () => {

    try {

        await connect(config.dbUrl, options)

    } catch (error) {

        console.log(error)
        process.exit(1)

    }

})

beforeEach(async () => {

    await Task.deleteMany()

})

afterAll(async () => {

    await disconnect()

})

describe('GET /api/tasks', () => {

    it('Should return array of tasks', async () => {

        // create test tasks
        const tasks = [{
            desc: 'Task One'
        },
        {
            desc: 'Task Two',
            status: true
        }
        ]
        await Task.create(tasks)

        // make request
        const response = await request(app)
            .get('/api/tasks')
            .set('Accept', 'application/json')

        // run assertions
        expect(response.status).toEqual(200)
        expect(response.body).toHaveLength(2)
        expect(response.body).toEqual(expect.arrayContaining(tasks))
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0]).toHaveProperty('desc')
        expect(response.body[0]).toHaveProperty('status')
        expect(response.body[0]).toHaveProperty('createdAt')
    })

    it('Should return empty array from empty database', async () => {

        // make request
        const response = await request(app)
            .get('/api/tasks')
            .set('Accept', 'application/json')

        // run assertions
        expect(response.status).toEqual(200)
        expect(response.body).toHaveLength(0)

    })

})

describe('GET /api/tasks/:task_id', () => {

    it('Should return Task object by ID', async () => {

        // create test tasks
        const task = await Task.create({ desc: 'Task One' })

        // make request
        const response = await request(app)
            .get(`/api/tasks/${task._id}`)
            .set('Accept', 'application/json')

        // run assertions
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('id', toString(task._id))
        expect(response.body).toHaveProperty('status', task.status)
        expect(response.body).toHaveProperty('desc', task.desc)
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')

    })

    it('Should return 404 if task NOT exists', async () => {

        // make request
        const response = await request(app)
            .get('/api/tasks/5cb0d8001ced78082027b51c')
            .set('Accept', 'application/json')

        // run assertions
        expect(response.status).toEqual(404)
        expect(response.body.errors).toBeDefined()
        expect(response.body.errors).toContain('Not Found')

    })

    it('Should return 400 if :task_id not a MongoId', async () => {

        // make request
        const response = await request(app)
            .get('/api/tasks/5cb0d8001ced7808202')
            .set('Accept', 'application/json')

        // run assertions
        expect(response.status).toEqual(400)
        expect(response.body.errors).toBeDefined()
        expect(response.body.errors).toContain('Bad Request')

    })

})

describe('POST /api/tasks', () => {

    it('Should save and return saved document', async () => {

        // make request to create task
        const task = { desc: 'Task One' }
        const response = await request(app)
            .post('/api/tasks')
            .set('Content-Type', 'application/json')
            .send(task)

        // run assertions
        expect(response.status).toEqual(201)
        expect(response.body).toMatchObject(task)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')
        expect(response.body).toHaveProperty('desc', task.desc)
        expect(response.body).toHaveProperty('status', false)

    })

    it('Should return 422 ValidationError if less then 3 chars in req.data', async () => {

        // make invalid request
        const response = await request(app)
            .post('/api/tasks')
            .set('Content-Type', 'application/json')
            .send({ desc: 'no' })

        // run assertions
        expect(response.status).toEqual(422)
        expect(response.body.errors).toBeDefined()
        expect(response.body.errors).toContain('Must be alphanumeric and minimum 3 characters in length')

    })

})

describe('PATCH /api/tasks/:task_id', () => {

    it('Should update task status if Boolean(true) is send', async () => {

        // create task
        const task = await Task.create({
            desc: 'Task to Test'
        })

        // make request
        const response = await request(app)
            .post(`/api/tasks/${task._id}`)
            .set('X-HTTP-Method-Override', 'PATCH')
            .set('Content-Type', 'application/json')
            .send({ status: true })

        // run assertions
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('id', toString(task._id))
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')
        expect(response.body).toHaveProperty('desc', task.desc)
        expect(response.body).toHaveProperty('status', true)

    })

    it('Should return 422 ValidationError if updated data not in [true, "true", "1"]', async () => {

        // create task
        const task = await Task.create({ desc: 'Task to Test' })

        // make request
        const response = await request(app)
            .post(`/api/tasks/${task._id}`)
            .set('X-HTTP-Method-Override', 'PATCH')
            .set('Content-Type', 'application/json')
            .send({
                status: 1
            })

        // run assertions
        expect(response.status).toEqual(422)
        expect(response.body.errors).toBeDefined()
        expect(response.body.errors).toContain('Invalid status value')

    })

})

describe('DELETE /api/tasks/:task_id', () => {

    it('Should return 204 No Content on succesfull task deletion', async () => {

        // create task to delete
        const task = await Task.create({ desc: 'Task to Delete' })

        // make request
        const response = await request(app)
            .post(`/api/tasks/${task._id}`)
            .set('X-HTTP-Method-Override', 'DELETE')

        expect(response.status).toEqual(204)

    })

    it('Should return 404 if task not found or already deleted', async () => {

        // create task for deletion
        const task = { _id: 12 }

        // make request
        const response = await request(app)
            .post(`/api/tasks/${task._id}`)
            .set('X-HTTP-Method-Override', 'DELETE')

        expect(response.status).toEqual(404)
        expect(response.body.errors).toBeDefined()
        expect(response.body.errors).toContain('Not Found')

    })

})
