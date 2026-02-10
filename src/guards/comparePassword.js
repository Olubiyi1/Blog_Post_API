import bcrypt from "bcrypt"

const comparePassword = async(password,hashedPassword)=>{
     await bcrypt.compare(password,hashedPassword)
}
export default comparePassword;