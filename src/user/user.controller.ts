import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<string> {
    await this.userService.update(+id, updateUserDto);
    return Object.assign({
      data: { ...updateUserDto },
      statusCode: 201,
      message: `updated successfully`
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    await this.userService.remove(+id);
    return Object.assign({
      data: { id: id },
      statusCode: 201,
      message: `deleted successfully`
    });
  }
}
