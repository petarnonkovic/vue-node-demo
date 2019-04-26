import mongoose from 'mongoose'
import formatDate from '../utils/formatDate'
import taskMethods from './taskMethods'

const TaskModelSchema = new mongoose.Schema({

    desc: {
        type: String,
        required: true,
        index: true
    },

    status: {
        type: Boolean,
        default: false
    }

})

/**
 * Schema options | timestamps
 */
TaskModelSchema.set('timestamps', true)

/**
 * Schema options | document transform
 */
TaskModelSchema.set('toJSON', {
    versionKey: false,
    transform: function(doc, ret) {

        const createdAtFormated = formatDate(ret.createdAt, 'D-MMM-YY')
        const updatedAtFormated = formatDate(ret.updatedAt, 'D-MMM-YY')
        return {
            id: ret._id,
            desc: ret.desc,
            status: ret.status,
            createdAt: createdAtFormated,
            updatedAt: updatedAtFormated
        }

    }
})

/**
 * Load class with methods
 */
TaskModelSchema.loadClass(taskMethods)

/**
 * Create & export Task model
 */
const Task = mongoose.model('Task', TaskModelSchema)

export default Task
