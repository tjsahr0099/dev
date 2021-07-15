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


@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character) private characterRepository: Repository<Character> ,
    @InjectRepository(Equipment) private equipmentRepository: Repository<Equipment> ,
    private readonly statusService: StatusService
    ){
    this.characterRepository = characterRepository;
    this.equipmentRepository = equipmentRepository;
    this.statusService = statusService;
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<void> {

    const character = await this.characterRepository.save(createCharacterDto);
    
    //장비 초기값 생성
    // const createEquipmentDto = new CreateEquipmentDto();    
    // createEquipmentDto.character = createCharacterDto;   
    createCharacterDto.equipment = new CreateEquipmentDto();
    await this.equipmentRepository.save(createCharacterDto.equipment);
    
    //스텟 초기값 생성
    // const createStatusDto = new CreateStatusDto();    
    // createCharacterDto = createStatusDto.character;
    createCharacterDto.status = new CreateStatusDto();
    await this.statusService.create(createCharacterDto.status);

    const updateCharacterDto = createCharacterDto;        
    
    // updateStatusDto = createCharacterDto;
    this.update(character.id, updateCharacterDto);
  }

  findAll(): Promise<Character[]>{
    return this.characterRepository.find();
  }

  findOne(id: string): Promise<Character> {

    return this.characterRepository
    .createQueryBuilder('character')
    .leftJoinAndSelect('character.equipment','equipment')
    .leftJoinAndSelect('character.status','status')
    .leftJoinAndSelect('status.nowstatus','nowstatus')
    .where('character.id = :id',{ id: id })
    .getOne();

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
