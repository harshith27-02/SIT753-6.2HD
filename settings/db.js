const mongoose = require("mongoose");

const linkDatabase = async () => {

    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo connected: ${connect.connection.host}`);
    }
    catch (error) {
        console.log(error.message);
    }

}

module.exports = linkDatabase;