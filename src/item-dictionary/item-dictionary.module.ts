import { Module } from '@nestjs/common';
import { ItemDictionaryService } from './item-dictionary.service';
import { ItemDictionaryController } from './item-dictionary.controller';
import { ItemDictionary } from './entities/item-dictionary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ItemDictionary])],
  controllers: [ItemDictionaryController],
  providers: [ItemDictionaryService]
})
export class ItemDictionaryModule {}
