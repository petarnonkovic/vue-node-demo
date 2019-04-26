import Task from '../models/Task'
import * as crud from '../lib/crudTrait'
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import {
    validationResult
} from 'express-validator/check'

// Preload Task on GET /api/tasks/:task_id
export const preload = async (req, res, next, taskId) => {

    if (req.method === 'DELETE') {

        return next()

    }

    try {

        const task = await crud.getOneById(Task, taskId)
        if (isNil(task)) {

            const error = new Error('Not Found')
            error.status = 404
            return next(error)

        }
        // task exists
        req.task = task
        return next()

    } catch (err) {

        err.message = 'Bad Request'
        err.status = 400
        return next(err)

    }

}

// GET /api/tasks
export const all = async (req, res, next) => {

    try {

        const tasks = await crud.getAll(Task)
        return res.json(tasks)

    } catch (err) {

        return next(err)

    }

}

// POST /api/tasks/
export const create = async (req, res, next) => {

    try {

        let errors = validationResult(req)
        if (!errors.isEmpty()) {

            errors = map(errors.array(), error => error.msg)

            return res.status(422).json({
                errors
            })

        }

        const data = {
            desc: req.body.desc
        }
        const task = await crud.createOne(Task, data)
        return res.status(201).json(task)

    } catch (err) {

        return next(err)

    }

}

// GET /api/tasks/
export const get = async (req, res, next) => {

    if (req.task instanceof Task) {

        return res.json(req.task)

    }

    const error = new Error('Bad Request')
    error.status = 400
    return next(error)

}

// PATCH /api/tasks/:task_id
export const update = async (req, res, next) => {

    if (req.task instanceof Task) {

        const task = req.task
        try {

            let errors = validationResult(req)
            if (!errors.isEmpty()) {

                errors = map(errors.array(), error => error.msg)

                return res.status(422).json({
                    errors
                })

            }

            task.desc = req.body.desc
            task.status = req.body.status
            const updatedTask = await crud.saveUpdated(task)
            return res.json(updatedTask)

        } catch (err) {

            return next(err)

        }

    }

    const error = new Error('Bad Request')
    error.status = 400
    return next(error)

}

// DELETE /api/tasks/:task_id
export const remove = async (req, res, next) => {

    try {

        const taskId = req.params.task_id
        await crud.removeOne(Task, taskId)
        return res.sendStatus(204)

    } catch (err) {

        err.message = 'Not Found'
        err.status = 404
        return next(err)

    }

}
