import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Path = require('path');

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [    
    TypeOrmModule.forRoot({
      
    }),
    UserModule,
  ]
})
export class AppModule {}
