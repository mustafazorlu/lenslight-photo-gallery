import mongoose from "mongoose";

const db_connection = () => {
    mongoose
        .connect(process.env.DB_URL, {
            dbName: "lenslight_db",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database connected.");
        })
        .catch((error) => {
            console.log(`Data base connection error: ${error}`);
        });
};

export default db_connection;
