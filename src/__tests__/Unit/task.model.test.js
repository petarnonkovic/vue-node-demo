import Task from '../../models/Task'
import * as CRUD from '../../lib/crudTrait'
let mock

beforeAll(() => {

    mock = jest.fn()

})

beforeEach(() => {

    mock.mockClear()

})


describe('Task Model | Model.find()', () => {

    it('Should call find() mongoose model method with query object', () => {

        Task.find = mock
        const query = {}

        CRUD.getAll(Task, query)
        // run assertions
        expect(Task.find).toHaveBeenCalledWith(query)
        expect(Task.find.mock.calls.length).toBe(1)
        expect(Task.find).toBeCalledTimes(1)

    })

    it('Model find() method should return a promise', async () => {

        Task.find = mock.mockImplementation(() => Promise.resolve('task Collection'))
        const query = {}

        // run assertions
        await expect(CRUD.getAll(Task, query)).resolves.toBe('task Collection')
        expect(Task.find).toBeCalledWith(query)

    })

})

describe('Task Model | Model.findById()', () => {

    it('Should call findById() mongoose model method with ID', () => {

        Task.findById = mock
        const id = 111

        CRUD.getOneById(Task, id)
        // run assertions
        expect(Task.findById).toHaveBeenCalledWith(id)
        expect(Task.findById.mock.calls.length).toBe(1)
        expect(Task.findById).toBeCalledTimes(1)

    })

    it('Model findById() should return a proimse', async () => {

        Task.findById = mock.mockImplementation(() => Promise.resolve('task Document'))
        const id = 22

        // run assertions
        await expect(CRUD.getOneById(Task, id)).resolves.toBe('task Document')
        expect(Task.findById).toBeCalledWith(id)

    })

})

describe('Task Model | Model.findOne()', () => {

    it('Should call findOne() mongoose model method with ID', () => {

        Task.findOne = mock
        const query = { _id: 333 }
        CRUD.getOneByQuery(Task, query)

        // run assertions
        expect(Task.findOne).toBeCalledWith(query)
        expect(Task.findOne.mock.calls.length).toBe(1)
        expect(Task.findOne).toBeCalledTimes(1)

    })

    it('Model findOne() should return a proimse', async () => {

        Task.findOne = mock.mockImplementation(() => Promise.resolve('task Document'))
        const query = { _id: 333 }

        // run assertions
        await expect(CRUD.getOneByQuery(Task, query)).resolves.toBe('task Document')
        expect(Task.findOne).toBeCalledWith(query)

    })

})

describe('Task Model | static Model.createDoc()', () => {

    it('Should create and save new Task', () => {

        Task.createDoc = mock
        const newTask = {
            desc: 'Test Task'
        }
        CRUD.createOne(Task, newTask)

        // run assertions
        expect(Task.createDoc).toHaveBeenCalled()
        expect(Task.createDoc.mock.calls.length).toBe(1)
        expect(Task.createDoc).toBeCalledWith(newTask)
        expect(Task.createDoc).toHaveReturned()

    })

    it('Model createDoc() should return a proimse', async () => {

        Task.createDoc = mock.mockImplementation(() => Promise.resolve('task Document'))
        const newTask = {
            desc: 'Test Task'
        }

        // run assertions
        await expect(CRUD.createOne(Task, newTask)).resolves.toBe('task Document')
        expect(Task.createDoc).toBeCalledWith(newTask)
    })

})

describe('Task Model | Model.create()', () => {

    it('Should create and save new Task', () => {

        Task.create = mock
        const newTask = {
            desc: 'Test Task'
        }
        CRUD.createOne(Task, newTask)

        // run assertions
        expect(Task.create).toHaveBeenCalled()
        expect(Task.create.mock.calls.length).toBe(1)
        expect(Task.create).toBeCalledWith(newTask)

    })

    it('Model createDoc() should return a proimse', async () => {

        Task.createDoc = mock.mockImplementation(() => Promise.resolve('task Document'))
        const newTask = {
            desc: 'Test Task'
        }

        // run assertions
        await expect(CRUD.createOne(Task, newTask)).resolves.toBe('task Document')
        expect(Task.createDoc).toBeCalledWith(newTask)
    })

})

describe('Task Model | Model.updateOne()', () => {

    it('Should call model updateOne() with id and updated data', () => {

        Task.updateOne = mock
        const updateData = {
            desc: 'Updated description',
            status: true
        }
        const id = 22
        CRUD.updateOne(Task, id, updateData)

        // run assertions
        expect(Task.updateOne).toBeCalledWith({ _id: id }, updateData)
        expect(Task.updateOne).toBeCalledTimes(1)
        expect(Task.updateOne.mock.calls.length).toBe(1)

    })

    it('Model updateOne() should return a promise', async () => {

        Task.updateOne = mock.mockImplementation(() => Promise.resolve('task Updated'))
        const updateData = {
            desc: 'Updated description',
            status: true
        }
        const id = 22

        // run assertions
        await expect(CRUD.updateOne(Task, id, updateData)).resolves.toBe('task Updated')
        expect(Task.updateOne).toBeCalledWith({ _id: id }, updateData)

    })

})

describe('Task Model | Model.deleteOne()', () => {

    it('Should call model deleteOne() with id of doc to remove', () => {

        Task.deleteOne = mock
        const id = 34
        CRUD.removeOne(Task, id)

        // run assertions
        expect(Task.deleteOne).toBeCalledWith({ _id: id })
        expect(Task.deleteOne).toBeCalledTimes(1)
        expect(Task.deleteOne.mock.calls.length).toBe(1)

    })

    it('Model deleteOne() should return a promise', async () => {

        Task.deleteOne = mock.mockImplementation(() => Promise.resolve('task Removed'))
        const id = 43

        // run assertions
        await expect(CRUD.removeOne(Task, id)).resolves.toBe('task Removed')
        expect(Task.deleteOne).toBeCalledWith({ _id: id })

    })

})

describe('Task Model | Model.save()', () => {

    it('Should call a task instance save() method', () => {

        const task = new Task({
            desc: 'Task OneOf'
        })
        task.save = mock
        CRUD.saveUpdated(task)

        // run assertions
        expect(task.save).toHaveBeenCalled()
        expect(task.save.mock.calls.length).toBe(1)

    })

    it('Model save() should return a promise', async () => {

        const task = new Task({
            desc: 'Task OneOf'
        })
        task.saveUpdatedDoc = mock
        task.save = mock.mockImplementation(() => Promise.resolve(task))

        // run assertions
        await expect(CRUD.saveUpdated(task)).resolves.toMatchObject(task)
        expect(task.saveUpdatedDoc.mock.calls.length).toBe(1)
        expect(task.saveUpdatedDoc).toHaveReturned()

    })

})
