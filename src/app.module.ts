import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './character/character.module';
import { EquipmentModule } from './equipment/equipment.module';
import { StatusModule } from './status/status.module';
import { InventoryModule } from './inventory/inventory.module';
import { ItemDictionaryModule } from './item-dictionary/item-dictionary.module';
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
    CharacterModule,
    EquipmentModule,
    StatusModule,
    InventoryModule,
    ItemDictionaryModule,
  ]
})
export class AppModule {}

