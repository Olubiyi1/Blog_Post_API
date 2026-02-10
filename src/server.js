import app from "./app.js";
import config from "./config/config.js";
import connectDb from "./config/db.js";

const startServer = async () => {
  try {
    await connectDb();
    app.listen(config.port, () => {
      console.log("up and running");
    });
  } catch (err) {
    console.error("failed to start server");

    process.exit(1);
  }
};
startServer();
