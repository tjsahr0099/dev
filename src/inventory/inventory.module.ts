import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { InventoryMaster } from './entities/inventory-master.entity';
import { ItemDictionary } from 'src/item-dictionary/entities/item-dictionary.entity';
import { ItemDictionaryService } from 'src/item-dictionary/item-dictionary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryItem]),
    TypeOrmModule.forFeature([InventoryMaster]),
    TypeOrmModule.forFeature([ItemDictionary]),    
  ],  
  controllers: [InventoryController],
  providers: [InventoryService,ItemDictionaryService]
})
export class InventoryModule {}
