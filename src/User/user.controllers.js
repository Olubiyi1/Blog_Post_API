import UserService from "./user.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class UserController {
  // create user
  static createUser = async (req, res, next) => {
    try {
      const user = await UserService.registerUser(req.body);
      return ResponseHandler.success(res, "User created successfully", user);
    } catch (error) {
      next(error);
    }
  };

  //   login user 

  static userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.loginUser({email,password});
      return ResponseHandler.success(res, "User logged in successfully", user);
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
