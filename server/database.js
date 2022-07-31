const mongoose = require('mongoose');

class Database {
    static init() {
        mongoose.connect(process.env.MONGO_DB).then(() => {
            console.log("DB UP");
        }).catch((err) => {
            console.log(err);
        })
    }
}

module.exports = Database;