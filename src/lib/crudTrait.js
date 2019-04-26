/**
 * Get All Model Documents
 * @param Mongoose Model
 * @param? Query Object
 * @returns Promise
 */
export const getAll = (model, query = {}) => model.all(query)
/**
 * Get One Model Documents
 * @param Mongoose Model
 * @param Model _id
 * @returns Promise
 */
export const getOneById = (model, id) => model.getDocById(id)
/**
 * Get One Model Documents
 * @param Mongoose Model
 * @param Model _id
 * @param? Query Object
 * @returns Promise
 */
export const getOneByQuery = (model, query = {}) => model.getDocByQuery(query)
/**
 * Create New Document
 * @param Mongoose Model
 * @param Object
 * @returns Promise
 */
export const createOne = (model, data) => model.createDoc(data)
/**
 * Update One Document
 * @param Mongoose Model
 * @param Model _id
 * @param Object
 * @returns Promise
 */
export const updateOne = (model, id, data) => model.updateDoc(id, data)
/**
 * Remove One Document
 * @param Mongoose Model
 * @param Model _id
 * @returns Promise
 */
export const removeOne = (model, id) => model.removeDoc(id)
/**
 * Save Updated Document
 * @param Document Instance
 * @returns Promise
 */
export const saveUpdated = doc => doc.saveUpdatedDoc()
