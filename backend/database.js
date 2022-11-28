const mongoose = require('mongoose');

const connection = `mongodb+srv://
${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@my-mern-stack-project.yt5os5x.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`;


console.log('db_config : ', connection);
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log("Mongo DB connection failed...", err));