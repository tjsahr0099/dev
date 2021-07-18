import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDictionaryDto } from './dto/create-item-dictionary.dto';
import { UpdateItemDictionaryDto } from './dto/update-item-dictionary.dto';
import { ItemDictionary } from './entities/item-dictionary.entity';

@Injectable()
export class ItemDictionaryService {

  constructor(   
    @InjectRepository(ItemDictionary) private itemDictionaryRepository: Repository<ItemDictionary>,  
    ){  
    this.itemDictionaryRepository = itemDictionaryRepository;
  }

  async create(createItemDictionaryDto: CreateItemDictionaryDto) {
    return await this.itemDictionaryRepository.save(createItemDictionaryDto);
  }

  findAll() {
    return `This action returns all itemDictionary`;
  }

  async findOne(id: string): Promise<ItemDictionary>  {

    //임시 ( 모든 스택사이즈 10)
    let itemDictionary = new ItemDictionary();
    itemDictionary.id = id;
    itemDictionary.maxStackSize = 10;

    return itemDictionary;
  }

  update(id: string, updateItemDictionaryDto: UpdateItemDictionaryDto) {
    return `This action updates a #${id} itemDictionary`;
  }

  remove(id: string) {
    return `This action removes a #${id} itemDictionary`;
  }
}
