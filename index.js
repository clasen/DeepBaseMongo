const { MongoClient } = require('mongodb');
const { nanoid } = require("nanoid");

class DeepBaseMongo {

    constructor(opts) {
        this.base = "deepbase";
        this.name = "documents";
        this.url = "mongodb://localhost:27017?retryWrites=false";
        this.idn = 10;
        this.session = null;
        Object.assign(this, opts);

        this.client = new MongoClient(this.url, { useUnifiedTopology: true });
        this.db = this.client.db(this.base);
        this.collection = this.db.collection(this.name);
    }
    startTransaction() {
        this.session = this.client.startSession();
        this.session.startTransaction();
    }

    commitTransaction() {
        if (!session) return;
        this.session.commitTransaction();
    }

    abortTransaction() {
        if (!session) return;
        this.session.abortTransaction();
    }

    endSession() {
        if (!session) return;
        this.session.endSession();
        this.session = null;
    }

    async connect() {
        return this.client.connect();
    }

    async set(...arr) {
        return this._updateOne(arr, "$set");
    }

    async inc(...arr) {
        return this._updateOne(arr, "$inc");
    }

    async dec(...arr) {
        arr[arr.length - 1] = -arr[arr.length - 1];
        return this._updateOne(arr, "$inc");
    }

    async _updateOne(arr, type = "$set") {
        const _id = arr.shift();
        const val = arr.pop();
        if (arr.some(clave => /[.$\\]/.test(clave)))
            throw new Error('Invalid key: avoid characters: "." "$" "\\"');
        const set = arr.length == 0 ? { [val]: null } : { [arr.join(".")]: val };
        const opts = { upsert: true, session: this.session }
        return this.collection.updateOne({ _id }, { [type]: set }, opts);
    }

    async get(...arr) {

        if (arr.length === 0) {
            const list = await this.collection.find({}).toArray();
            const obj = {};
            for (let item of list) {
                obj[item._id] = item;
                delete item._id;
            }
            return obj;
        }

        const _id = arr.shift();
        const obj = await this.collection.findOne({ _id })
        if (obj === null) return null;

        delete obj._id;
        return this._get(obj, arr);
    }

    _get(obj, keys) {

        if (keys.length === 0) {
            return obj;
        }

        if (keys.length === 1) {
            return obj[keys[0]] === undefined ? null : obj[keys[0]];
        }

        const key = keys.shift();
        if (!obj.hasOwnProperty(key)) {
            return null;
        }

        return this._get(obj[key], keys);
    }

    del(...arr) {
        if (arr.length === 0) {
            return this.collection.deleteMany({});
        }

        return this._updateOne(arr, "$unset");
    }

    async add(...keys) {
        const value = keys.pop();
        const id = nanoid(this.idn);
        await this.set(...[...keys, id, value]);
        return [...keys, id];
    }

    async keys(...args) {
        const r = await this.get(...args);
        return (r !== null && typeof r === "object") ? Object.keys(r) : [];
    }

    async values(...args) {
        const r = await this.get(...args)
        return (r !== null && typeof r === "object") ? Object.values(r) : [];
    }        

    async upd(...args) {
        const func = args.pop();
        return this.set(...args, func(await this.get(...args)));
    }
}

module.exports = DeepBaseMongo;