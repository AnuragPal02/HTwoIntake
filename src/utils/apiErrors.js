
class apiErrors extends Error {
    constructor(statusCode,message = 'something wrong', error = [],stack = ''){
        super(message);
        this.statusCode = statusCode,
        this.error = error,
        this.data = null,
        this.success = false,
        this.message = message

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default apiErrors;