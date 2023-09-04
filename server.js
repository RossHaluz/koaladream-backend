const { app } = require("./app");
const mongoose = require('mongoose');

const {DB_HOST, PORT} = process.env;

mongoose.connect(DB_HOST).then(res => {
    console.log(`Database success connect on ${PORT} port`);
    app.listen(PORT);
}).catch((err) => {
    console.log(err.message);
    process.exit(1);
})
