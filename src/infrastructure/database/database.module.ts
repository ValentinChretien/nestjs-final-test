import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://localhost:${configService.get('DATABASE_PORT')}/${configService.get('DATABASE_NAME')}`,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
