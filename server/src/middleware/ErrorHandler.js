export const errorHandler = async (err) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }
  };
  
  export const ErrorHandler = (error,req,res,next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "failed"
    res.status(error.statusCode).json({
        status: error.status,
        data: error.message,
        stack: error?.stack
    })
}


  export class AppError extends Error {
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? "failed" : "error"
        Error.captureStackTrace(this,this.contructor)
    }
}