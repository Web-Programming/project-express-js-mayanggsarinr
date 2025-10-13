const mongoose = require("mongoose");
const dbURI = "mongodb+srv://mayanggsarinr_db_user:Aa112288z@cluster0.t5iuafp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI, {});
mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on("error", (err) => {
    console.log("Mongoose connected error:", err);
});
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected");
});