import express from "express";
import dotenv from "dotenv";
import db_connection from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

db_connection();

const app = express();
// const port = process.env.PORT;
const port = 4000;

//ejs template engine
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
});
