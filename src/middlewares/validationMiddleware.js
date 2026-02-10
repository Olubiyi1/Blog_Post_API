import ResponseHandler from "../utils/responseHandler.js";

const validate = (schema) =>(req,res,next)=>{
    const {error, value} = schema.validate(req.body,{
        abortEarly:false,
        stripUnknown:true
    });

    if(error){
        return ResponseHandler.badRequest(res,"")
    }
    req.body = value
    next()
};
export default validate;