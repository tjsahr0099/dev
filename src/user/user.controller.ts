import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // async : 해당 함수를 비동기로 만듬.
  // await : 
  // Promise : 

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    await this.userService.create(createUserDto);
    return Object.assign({
      data: { ...createUserDto },
      statusCode: 201,
      message: `created successfully`
    });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<string> {
    await this.userService.update(id, updateUserDto);
    return Object.assign({
      data: { ...updateUserDto },
      statusCode: 201,
      message: `updated successfully`
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    await this.userService.remove(id);
    return Object.assign({
      data: { id: id },
      statusCode: 201,
      message: `deleted successfully`
    });
  }
}
