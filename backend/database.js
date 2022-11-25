const mongoose = require('mongoose');

const connection = `mongodb+srv://
    ${process.env.DB_USER_NAME}:
    ${process.env.DB_PASSWORD}@cluster0.ywhjhfn.mongodb.net/
    ${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));