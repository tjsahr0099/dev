import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Status } from 'src/status/entities/status.entity';
import { StatusService } from 'src/status/status.service';
import { NowStatus } from 'src/status/entities/now-status.entity';
import { StatusModule } from 'src/status/status.module';
import { InventoryMaster } from 'src/inventory/entities/inventory-master.entity';

@Module({
  imports: [
    // StatusModule,
    TypeOrmModule.forFeature([Character]),
    TypeOrmModule.forFeature([Equipment]),
    TypeOrmModule.forFeature([Status]),
    TypeOrmModule.forFeature([NowStatus]),
    TypeOrmModule.forFeature([InventoryMaster]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService,StatusService]
})
export class CharacterModule {}
