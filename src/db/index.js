import {
    drizzle
} from 'drizzle-orm/nodepostgres';
import {
    Client
} from 'pg';
import * as schema from './schema';
const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'nodejs_course_admin',
    password: 'my_password',
    database: 'nodejs_course_database',
});
await client.connect();
export const db = drizzle(client, {
    schema
});