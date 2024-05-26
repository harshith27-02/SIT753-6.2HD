class ErrResponse extends Error {
    constructor(errMsg, errCode) {
        super(errMsg)
        this.errCode = errCode
    }
}

module.exports = ErrResponse