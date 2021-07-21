import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('character')
@ApiTags('캐릭터')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {    
    await this.characterService.create(createCharacterDto);
    return Object.assign({
      data: { ...createCharacterDto },
      statusCode: 201,
      message: `created successfully`
    });
  }

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    await this.characterService.update(id, updateCharacterDto);
    return Object.assign({
      data: { ...updateCharacterDto },
      statusCode: 201,
      message: `updated successfully`
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await  this.characterService.remove(id);
    return Object.assign({
      data: { id: id },
      statusCode: 201,
      message: `deleted successfully`
    });
  }
}
