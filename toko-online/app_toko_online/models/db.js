const mongoose = require("mongoose");
const dbURI = "mongodb://localhost:27017/pawII-SI5C";

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