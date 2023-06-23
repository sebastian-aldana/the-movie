import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  mongo: {
    connection: process.env.MONGO_CONNECTION,
  },
}));
