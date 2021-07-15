import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Status } from 'src/status/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    TypeOrmModule.forFeature([Equipment]),
    TypeOrmModule.forFeature([Status])
  ],
  controllers: [CharacterController],
  providers: [CharacterService]
})
export class CharacterModule {}
