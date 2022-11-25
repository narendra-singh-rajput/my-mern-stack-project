const mongoose = require('mongoose');
const connection = "mongodb+srv://mongo:d576F3YLwzRLWEkN@cluster0.ywhjhfn.mongodb.net/personal?retryWrites=true&w=majority";
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));