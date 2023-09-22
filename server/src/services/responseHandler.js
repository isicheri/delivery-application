export const responseHandler = async(res, code, success, msg, data) => {
    res.status(code).json({
        success,
        code,
        msg,
        data
    });
}