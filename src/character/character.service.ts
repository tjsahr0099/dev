import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm/index';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Status } from 'src/status/entities/status.entity';

@Injectable()
export class CharacterService {

  constructor(
    @InjectRepository(Character) private characterRepository: Repository<Character> ,
    @InjectRepository(Equipment) private equipmentRepository: Repository<Equipment> ,
    @InjectRepository(Status) private statusRepository: Repository<Status>
    ){
    this.characterRepository = characterRepository;
    this.equipmentRepository = equipmentRepository;
    this.statusRepository = statusRepository;
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<void> {

    await this.equipmentRepository.save(createCharacterDto.equipment);

    await this.statusRepository.save(createCharacterDto.status);

    console.log(createCharacterDto);

    await this.characterRepository.save(createCharacterDto);
  }

  findAll(): Promise<Character[]>{
    return this.characterRepository.find();
  }

  findOne(id: string): Promise<Character> {
    
    return this.characterRepository
    .createQueryBuilder('character')
    .leftJoinAndSelect('character.equipment', 'equipment')
    .leftJoinAndSelect('character.status', 'status')
    .where('character.id = :id',{ id: id })
    .getOne();

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
