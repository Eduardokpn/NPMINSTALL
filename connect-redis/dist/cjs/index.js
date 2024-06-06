"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = require("express-session");
const noop = (_err, _data) => { };
class RedisStore extends express_session_1.Store {
    constructor(opts) {
        super();
        this.prefix = opts.prefix == null ? "sess:" : opts.prefix;
        this.scanCount = opts.scanCount || 100;
        this.serializer = opts.serializer || JSON;
        this.ttl = opts.ttl || 86400; // One day in seconds.
        this.disableTTL = opts.disableTTL || false;
        this.disableTouch = opts.disableTouch || false;
        this.client = this.normalizeClient(opts.client);
    }
    // Create a redis and ioredis compatible client
    normalizeClient(client) {
        let isRedis = "scanIterator" in client;
        return {
            get: (key) => client.get(key),
            set: (key, val, ttl) => {
                if (ttl) {
                    return isRedis
                        ? client.set(key, val, { EX: ttl })
                        : client.set(key, val, "EX", ttl);
                }
                return client.set(key, val);
            },
            del: (key) => client.del(key),
            expire: (key, ttl) => client.expire(key, ttl),
            mget: (keys) => (isRedis ? client.mGet(keys) : client.mget(keys)),
            scanIterator: (match, count) => {
                if (isRedis)
                    return client.scanIterator({ MATCH: match, COUNT: count });
                // ioredis impl.
                return (async function* () {
                    let [c, xs] = await client.scan("0", "MATCH", match, "COUNT", count);
                    for (let key of xs)
                        yield key;
                    while (c !== "0") {
                        ;
                        [c, xs] = await client.scan(c, "MATCH", match, "COUNT", count);
                        for (let key of xs)
                            yield key;
                    }
                })();
            },
        };
    }
    async get(sid, cb = noop) {
        let key = this.prefix + sid;
        try {
            let data = await this.client.get(key);
            if (!data)
                return cb();
            return cb(null, await this.serializer.parse(data));
        }
        catch (err) {
            return cb(err);
        }
    }
    async set(sid, sess, cb = noop) {
        let key = this.prefix + sid;
        let ttl = this._getTTL(sess);
        try {
            let val = this.serializer.stringify(sess);
            if (ttl > 0) {
                if (this.disableTTL)
                    await this.client.set(key, val);
                else
                    await this.client.set(key, val, ttl);
                return cb();
            }
            else {
                return this.destroy(sid, cb);
            }
        }
        catch (err) {
            return cb(err);
        }
    }
    async touch(sid, sess, cb = noop) {
        let key = this.prefix + sid;
        if (this.disableTouch || this.disableTTL)
            return cb();
        try {
            await this.client.expire(key, this._getTTL(sess));
            return cb();
        }
        catch (err) {
            return cb(err);
        }
    }
    async destroy(sid, cb = noop) {
        let key = this.prefix + sid;
        try {
            await this.client.del([key]);
            return cb();
        }
        catch (err) {
            return cb(err);
        }
    }
    async clear(cb = noop) {
        try {
            let keys = await this._getAllKeys();
            if (!keys.length)
                return cb();
            await this.client.del(keys);
            return cb();
        }
        catch (err) {
            return cb(err);
        }
    }
    async length(cb = noop) {
        try {
            let keys = await this._getAllKeys();
            return cb(null, keys.length);
        }
        catch (err) {
            return cb(err);
        }
    }
    async ids(cb = noop) {
        let len = this.prefix.length;
        try {
            let keys = await this._getAllKeys();
            return cb(null, keys.map((k) => k.substring(len)));
        }
        catch (err) {
            return cb(err);
        }
    }
    async all(cb = noop) {
        let len = this.prefix.length;
        try {
            let keys = await this._getAllKeys();
            if (keys.length === 0)
                return cb(null, []);
            let data = await this.client.mget(keys);
            let results = data.reduce((acc, raw, idx) => {
                if (!raw)
                    return acc;
                let sess = this.serializer.parse(raw);
                sess.id = keys[idx].substring(len);
                acc.push(sess);
                return acc;
            }, []);
            return cb(null, results);
        }
        catch (err) {
            return cb(err);
        }
    }
    _getTTL(sess) {
        if (typeof this.ttl === "function") {
            return this.ttl(sess);
        }
        let ttl;
        if (sess && sess.cookie && sess.cookie.expires) {
            let ms = Number(new Date(sess.cookie.expires)) - Date.now();
            ttl = Math.ceil(ms / 1000);
        }
        else {
            ttl = this.ttl;
        }
        return ttl;
    }
    async _getAllKeys() {
        let pattern = this.prefix + "*";
        let keys = [];
        for await (let key of this.client.scanIterator(pattern, this.scanCount)) {
            keys.push(key);
        }
        return keys;
    }
}
exports.default = RedisStore;
