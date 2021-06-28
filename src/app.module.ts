import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconifg from './ormconfig'
import Path = require('path');

import * as dotenv from 'dotenv'; //.env 불러오기
dotenv.config();  //.env 불러오기

// console.log(ormconifg);
// console.log(${process.env.DB_HOST});

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [    
    //TypeOrmModule.forRoot(ormconifg),
    //UserModule,
  ]
})
export class AppModule {}

// todo : 정보 환경설정으로 뺴고 이그노어 할 것
//C:\\dev\\dist\\user\\entities\\user.entity.ts
//Path.join(__dirname,`\**\entities\*.entity.ts`)