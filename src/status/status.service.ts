import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNowStatusDto } from './dto/create-now-status.dto';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { NowStatus } from './entities/now-status.entity';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {

  constructor(
    @InjectRepository(Status) private statusRepository: Repository<Status>,
    @InjectRepository(NowStatus) private nowStatusRepository: Repository<NowStatus>
    ){
    this.statusRepository = statusRepository;
    this.nowStatusRepository = nowStatusRepository;
  }


  async create(createStatusDto: CreateStatusDto): Promise<void> {

    const status = await this.statusRepository.save(createStatusDto);

    // let createNowStatusDto: CreateNowStatusDto = new Object(); 
    // createNowStatusDto.status = createStatusDto;

    createStatusDto.nowstatus = new CreateNowStatusDto();
    await this.nowStatusRepository.save(createStatusDto.nowstatus);
    
    const updateStatusDto = createStatusDto;  
    await this.update(status.id,updateStatusDto);
  }

  findAll() {
    return `This action returns all status`;
  }

  findOne(id: string) {
    return `This action returns a #${id} status`;
  }

  async update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.statusRepository.update({ id: id }, updateStatusDto);
  }

  remove(id: string) {
    return `This action removes a #${id} status`;
  }
}
