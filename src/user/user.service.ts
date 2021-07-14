import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/index';
import { CharacterService } from 'src/character/character.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly characterService: CharacterService){
    this.userRepository = userRepository;
    this.characterService = characterService;
  }


  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]>{
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {

    let temp = {};

    const userInfo: Promise<User> = this.userRepository.findOne({ id: id });

    userInfo.then(user => {
      Object.assign(user, this.characterService.getCharacterByUserId(id));
    })
    //어렵네
    return ;

    

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id: id }, updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.delete({ id: id });
  }
}
