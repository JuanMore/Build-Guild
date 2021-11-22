module.exports = catchErr => {
    return (req, res, next) => {
        catchErr(req, res, next).catch(next)
    }
}