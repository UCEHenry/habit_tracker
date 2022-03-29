const MongoClient = require("mongodb");

export default class TestDBHelper {
    constructor() {
        this.db = null;
        // this.server = new
        this.connection = null;
    }
    async start() {
        this.connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        this.db = this.connection.db(global.__MONGO_DB_NAME__)

    }
    stop() {
        this.connection.close();
    }
    async cleanup() {
        const collections = await this.db.listCollections().toArray();
        return Promise.all(
            collections
                .map(({ name }) => name)
                .map(collection => this.db.collection(collection).drop())
        );
    }
    async createDoc(collectionName, document) {
        const { ops } = await this.db
          .collection(collectionName)
          .insertOne(document);
        return ops[0];
      }
}
