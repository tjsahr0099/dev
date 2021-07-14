import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/index';
import { getRepository } from 'typeorm';
import { Character } from 'src/character/entities/character.entity';
// import { CharacterService } from 'src/character/character.service';
// User모듈에서 Character를 사용하려면 모듈쪽에 임포트해줘야 하므로 이런식의 사용은 아닌것 같음.

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private readonly characterService: CharacterService
    ){
    this.userRepository = userRepository;
    // this.characterService = characterService;
  }


  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]>{
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {

    
      

    // getRepository(Character).createQueryBuilder('character')

    return this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.characters', 'character')
    .where('user.id = :id',{ id: id })
    .getOne();
    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id: id }, updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.delete({ id: id });
  }
}
