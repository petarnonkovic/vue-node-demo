const {
    body
} = require('express-validator/check')
/**
 * Create request validator
 */
export const validateCreateReq = () => {

    return [
        body('desc', 'Must be alphanumeric and minimum 3 characters in length').isString().isLength({
            min: 3
        })
    ]

}

/**
 * Update request validator
 */
export const validateUpdateReq = () => {

    return [
        body('status', 'Invalid status value').toBoolean('status').isIn([true, false]),
        body('desc', 'Must be alphanumeric and minimum 3 characters in length').isString().isLength({
            min: 3
        })
    ]

}
