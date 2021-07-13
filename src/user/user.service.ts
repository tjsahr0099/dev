import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){
    this.userRepository = userRepository;
  }


  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]>{
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id: id }, updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.delete({ id: id });
  }
}
