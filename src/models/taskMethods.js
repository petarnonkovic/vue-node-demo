export default class CRUDMethods {

    static all(query) {

        return this.find(query)

    }

    static getDocById(id) {

        return this.findById(id)

    }

    static getDocByQuery(query) {

        return this.findOne(query)

    }

    static createDoc(data) {

        return task.create(data)

    }

    static updateDoc(id, data) {

        return this.updateOne({
            _id: id
        }, data)

    }

    static removeDoc(id) {

        return this.deleteOne({
            _id: id
        })

    }

    saveUpdatedDoc() {

        return this.save()

    }

}
