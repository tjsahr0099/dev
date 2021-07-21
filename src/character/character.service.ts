import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm/index';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Status } from 'src/status/entities/status.entity';
import { StatusService } from 'src/status/status.service';
import { CreateEquipmentDto } from 'src/equipment/dto/create-equipment.dto';
import { CreateStatusDto } from 'src/status/dto/create-status.dto';
import { CreateInventoryDto } from 'src/inventory/dto/create-inventory.dto';
import { InventoryMaster } from 'src/inventory/entities/inventory-master.entity';
import { CreateInventoryMasterDto } from 'src/inventory/dto/create-inventory-master.dto';
import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { CustomError } from 'src/common/error/common.error';


@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character) private characterRepository: Repository<Character> ,
    @InjectRepository(Equipment) private equipmentRepository: Repository<Equipment> ,
    @InjectRepository(InventoryMaster) private inventoryRepository: Repository<InventoryMaster> ,
    @InjectRepository(InventoryItem) private inventoryItemRepository: Repository<InventoryItem> ,
    private readonly statusService: StatusService
    ){
    this.characterRepository = characterRepository;
    this.equipmentRepository = equipmentRepository;
    this.inventoryRepository = inventoryRepository;
    this.inventoryItemRepository = inventoryItemRepository;
    this.statusService = statusService;
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<void> {

    const character = await this.characterRepository.save(createCharacterDto);
    
    //장비 초기값 생성
    createCharacterDto.equipment = new CreateEquipmentDto();
    await this.equipmentRepository.save(createCharacterDto.equipment);
    
    //스텟 초기값 생성
    createCharacterDto.status = new CreateStatusDto();
    await this.statusService.create(createCharacterDto.status);

    //인벤토리 마스터 초기값 생성
    createCharacterDto.inventory = new CreateInventoryMasterDto();
    await this.inventoryRepository.save(createCharacterDto.inventory);

    //캐릭터에 외부키 업데이트
    const updateCharacterDto = createCharacterDto;            
    this.update(character.id, updateCharacterDto);
  }

  findAll(): Promise<Character[]>{
    return this.characterRepository.find();
  }

  async findOne(id: string): Promise<Character> {

    const character = await this.characterRepository
    .createQueryBuilder('character')
    .leftJoinAndSelect('character.equipment','equipment')
    .leftJoinAndSelect('character.status','status')
    .leftJoinAndSelect('status.nowstatus','nowstatus')    
    .leftJoinAndSelect('character.inventory','inventory')    
    .where('character.id = :id',{ id: id })
    .getOne();

    console.log("1");

    if(character==null){
      throw new CustomError("케릭터 미존재");
    }

    character.inventory.items = await this.inventoryItemRepository
    .createQueryBuilder('inventoryItem')      
    .where('inventoryItem.inventoryId = :id',{ id: character.inventory.id })    
    .innerJoinAndSelect('inventoryItem.item','item')
    .orderBy('y','ASC').addOrderBy('x','ASC')    
    .getMany();

    
    
    // character.inventory.items.forEach(item=>{
    //   item.createDate = undefined;
    //   item.updateDate = undefined;
    //   item.inventoryId = undefined;
    // });

    console.log(character);

    return character;

    // .leftJoinAndSelect('character.equipment', 'equipment')
    // .leftJoinAndSelect('character.status', 'status')

    // return this.characterRepository.findOne({ id: id });
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    await this.characterRepository.update({ id: id }, updateCharacterDto);
  }

  async remove(id: string) {
    await this.characterRepository.delete({ id: id });
  }

  // userId로 character 목록 조회
  // getCharacterByUserId(userId: number): Promise<Character[]> {
  //   return this.characterRepository.find({ userId: userId });
  // }
}
