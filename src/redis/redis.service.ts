import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    private readonly redisClient: Redis;

    constructor() {
        this.redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD
        });
    }

    async storeOperation(userId: string, operation: any) {
        const operationsKey = `operations:${userId}`;
        await this.redisClient.lpush(operationsKey, JSON.stringify(operation));
    }

    async getOperations(userId: string) {
        const operationsKey = `operations:${userId}`;
        const operations = await this.redisClient.lrange(operationsKey, 0, -1);
        return operations.map((op) => JSON.parse(op));
    }
}