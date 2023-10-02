const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Successfully database connected. ", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(err);
        process.exit();
    }
}

module.exports = connectDb;