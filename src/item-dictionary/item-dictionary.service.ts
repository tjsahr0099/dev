import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exception } from 'console';
import { CLASS, SUB_CLASS } from 'src/common/enum/common.enum';
import { CustomError } from 'src/common/error/common.error';
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

    //todo : 중복이름체크 => 업데이트도    

    const itemDictionary = await this.findOneBySubKeys(createItemDictionaryDto.class,createItemDictionaryDto.subClass);

    console.log("=============번호증가작업시작===========");
    console.log("이전번호item",itemDictionary);
    
    itemDictionary!=null ? (createItemDictionaryDto.no = itemDictionary.no+1) : createItemDictionaryDto.no = 1 ;

    console.log("현재번호item",createItemDictionaryDto);
    console.log("=============번호증가작업끝=============");

    return await this.itemDictionaryRepository.insert(createItemDictionaryDto);
  }

  findAll(): Promise<ItemDictionary[]>  {
    return this.itemDictionaryRepository.find();
  }

  findOne(id: string): Promise<ItemDictionary>  {
    return this.itemDictionaryRepository.findOne(id);
  }

  async findOneBySubKeys(clazz: string, subClazz: string): Promise<ItemDictionary>  {
    console.log(clazz);
    return await this.itemDictionaryRepository
    .createQueryBuilder('itemDictionary')
    .where('itemDictionary.class = :clazz',{ clazz: clazz })
    .andWhere('itemDictionary.subClass = :subClazz',{ subClazz: subClazz })        
    .withDeleted()
    .orderBy('no','DESC')
    .limit(1)
    .getOne();

    // return this.itemDictionaryRepository.findOne(id);
  }

  async update(id: string, updateItemDictionaryDto: UpdateItemDictionaryDto) {
    return await this.itemDictionaryRepository.update(id,updateItemDictionaryDto);
  }

  async remove(id: string) {
    return await this.itemDictionaryRepository.softDelete(id);
  }
}
