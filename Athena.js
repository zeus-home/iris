const { MongoClient } = require("mongodb");

const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE = 'tesseract'

class Athena {

    static getInstance() {
        if (!this.db) {
            this.db = this._connectDatabase();
        }
        return this.db;
    }

    static async _connectDatabase() {
        const client = await MongoClient.connect(`${MONGO_URL}`, {useNewUrlParser: true})
        if(!client) {
            throw Error("Client could not connect")
        }
        return client.db(DATABASE)
    }

}
exports.Athena = Athena;