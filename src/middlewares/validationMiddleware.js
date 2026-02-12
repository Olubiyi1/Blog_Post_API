import ResponseHandler from "../utils/responseHandler.js";

const validate = (schema) =>(req,res,next)=>{
    const {error, value} = schema.validate(req.body,{
        abortEarly:false,
        stripUnknown:true
    });

    if(error){
       const errors = error.details.map(detail => ({
        field:detail.path.join("."),
        message:detail.message
       }))
        return ResponseHandler.badRequest(res,"Validation error",errors)
    }
    req.body = value
    next()
};

export default validate;