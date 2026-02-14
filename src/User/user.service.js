import userSchema from "../User/user.model.js";
import AppError from "../errorHandlers/appError.js";
import hashPassword from "../guards/hashPassword.js";
import createJwt from "../guards/createJwt.js";
import comparePassword from "../guards/comparePassword.js";

class UserService {

  static registerUser = async (data) => {
    const { firstName, lastName, email, password } = data;

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await userSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  };

  static loginUser = async (data) => {
    const { email, password } = data;

    console.log("attempted loging with", { email, password });

    const user = await userSchema.findOne({ email });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = createJwt({
      userId: user._id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  };
}

export default UserService;
