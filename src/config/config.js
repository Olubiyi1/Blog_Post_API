import dotenv from "dotenv"
dotenv.config()

export default{
    port:process.env.PORT,
    mongo_uri:process.env.MONGO_URI,
    // test_db:process.env.TEST_MONGO_URI,
    secret:process.env.SECRET_KEY
};