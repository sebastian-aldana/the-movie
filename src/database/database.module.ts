import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection } = configService.mongo;
        return {
          uri: `${connection}`,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection } = configService.mongo;
        const client = new MongoClient(connection);
        await client.connect();
        const database = client.db('movies');
        console.log('connected to database');
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
