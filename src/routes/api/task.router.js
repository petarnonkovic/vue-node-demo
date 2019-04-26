import express from 'express'
import * as task from '../../controllers/taskController'
import * as validator from '../../utils/taskValidator'
const router = express.Router()

router.param('task_id', task.preload)

router.route('/')
    .get(task.all)
    .post(validator.validateCreateReq(), task.create)

router.route('/:task_id')
    .get(task.get)
    .patch(validator.validateUpdateReq(), task.update)
    .delete(task.remove)

export default router
