const mongoose = require('mongoose');

const url = "mongodb+srv://haykhunaa:uNU38N9kmpFO0FEB@cluster0.bxfvdnq.mongodb.net/shoping?retryWrites=true&w=majority";

module.exports = {
    run: async () => {
        try {
            console.log("Connecting to MongoDB...");
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (err) {
            console.log("Connection error:", err);
        }
    }
}
