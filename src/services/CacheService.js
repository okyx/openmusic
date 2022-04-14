const redis = require('redis');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });
    this._client.on('error', (err) => {
      console.log(err);
    });

    this._client.connect();
  }

  async set(key, value, expired = 1800) {
    await this._client.set(key, value, {
      EX: expired,
    });
  }

  async get(key) {
    const result = await this._client.get(key);
    if (result === null) throw new Error('cache tidak ada');
    return result;
  }

  delete(key) {
    const result = this._client.del(key);
    return result;
  }
}

module.exports = CacheService;
