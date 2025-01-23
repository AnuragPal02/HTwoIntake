
class apiResponse{
    constructor(statusCode,message = 'success',data){
        this.statusCode = statusCode,
        this.message = message,
        this.data = data
        if(statusCode >= 400){
            this.success = false;
        }else{
            this.success = true;
        }
    }
}

export default apiResponse;