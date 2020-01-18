const mongoose = require('mongoose');
//const MONGO_URI = 'mongodb+srv://d-kuznetsov:24593MongoDataBase5285@cluster1-f2d6l.mongodb.net/tic-tac-toe?retryWrites=true&w=majority'
module.exports = () => {
    mongoose
        .connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => console.log('MongoDB has been connected'))
        .catch((e) => console.log(e));
}