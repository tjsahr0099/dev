import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { NowStatus } from './entities/now-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status]),TypeOrmModule.forFeature([NowStatus])],
  controllers: [StatusController],
  providers: [StatusService]
})
export class StatusModule {}
