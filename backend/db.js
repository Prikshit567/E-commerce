const mongoose = require('mongoose');

const connectToMongo = async () => {

    await mongoose.connect(process.env.MONGO_URI).then((data) => {
        console.log(`Connected to Mongoose Successfully: ${data.connection.host}`);
    }).catch((err) => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit process with failure
    })
};

module.exports = connectToMongo;
