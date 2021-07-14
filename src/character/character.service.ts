import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class CharacterService {

  constructor(@InjectRepository(Character) private characterRepository: Repository<Character>){
    this.characterRepository = characterRepository;
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<void> {
    await this.characterRepository.save(createCharacterDto);
  }

  findAll(): Promise<Character[]>{
    return this.characterRepository.find();
  }

  findOne(id: number): Promise<Character> {
    return this.characterRepository.findOne({ id: id });
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    await this.characterRepository.update({ id: id }, updateCharacterDto);
  }

  async remove(id: number) {
    await this.characterRepository.delete({ id: id });
  }

  // userId로 character 목록 조회
  getCharacterByUserId(userId: number): Promise<Character[]> {
    return this.characterRepository.find({ userId: userId });
  }
}
