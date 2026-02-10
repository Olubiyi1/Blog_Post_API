import jwt from "jsonwebtoken"
import config from "../config/config.js"

const createJwt = (user)=>{
    return jwt.sign({
        id:user._id,
        email:user.email
    },
    config.secret,
    {expiresIn:"1h"}
)
}
export default createJwt