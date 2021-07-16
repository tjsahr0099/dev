import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { InventoryMaster } from './entities/inventory-master.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryItem]),
    TypeOrmModule.forFeature([InventoryMaster])
  ],  
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
