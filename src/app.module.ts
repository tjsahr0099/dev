import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import Path = require('path');
import * as ormconifg from './ormconfig'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormconifg),
    UserModule,
  ]
})
export class AppModule {}

