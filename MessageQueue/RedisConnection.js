import IORedis from 'ioredis'

const redisConfig = {
    port: 6379,
    host: '127.0.0.1',
    maxRetriesPerRequest: null,
  };
  
 const RedisConnection = new IORedis(redisConfig);

export default RedisConnection