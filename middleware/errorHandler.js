const ErrResponse = require('../common/errorResponse')
const errorHandler = (err, req, res, next) => {
    let error = {...err}
    error.message = err.message

    if(err.name === "CastError") {
        error = new ErrResponse(`Resource not found for Id ${err.value}`, 404)
    }
    if(err.code === 11000) {
        error = new ErrResponse(`Duplicate field value entered ${err.message}`, 400)
    }
    res.status(error.errCode).json({
        success: false, error: error.message
    })
}

module.exports = errorHandler