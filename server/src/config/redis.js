module.exports = {
  url: '',
  key: 'starling_secret',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  host: 'localhost',
  port:  6379,
  async get(key) {
    console.log('get', key);
    const res = await redis.get(key);
    if (!res) return null;
    return JSON.parse(res);
  },

  async set(key, value, maxAge) {
    console.log('set', key, value);
    maxAge = typeof maxAge === 'number' ? maxAge : redisConfig.maxAge;
    value = JSON.stringify(value);
    await redis.set(key, value, maxAge);
  },

  async destroy(key) {
    console.log('destroy', key);
    await redis.del(key);
  },
};
