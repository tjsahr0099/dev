import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemDictionaryService } from './item-dictionary.service';
import { CreateItemDictionaryDto } from './dto/create-item-dictionary.dto';
import { UpdateItemDictionaryDto } from './dto/update-item-dictionary.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('item-dictionary')
@ApiTags('아이템사전')
export class ItemDictionaryController {
  constructor(private readonly itemDictionaryService: ItemDictionaryService) {}

  @Post()
  async create(@Body() createItemDictionaryDto: CreateItemDictionaryDto) {
    await this.itemDictionaryService.create(createItemDictionaryDto);
    return Object.assign({
      data: { ...createItemDictionaryDto },
      statusCode: 201,
      message: `created successfully`
    });
  }

  @Get()
  findAll() {
    return this.itemDictionaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemDictionaryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDictionaryDto: UpdateItemDictionaryDto) {
    await this.itemDictionaryService.update(id, updateItemDictionaryDto);
    return Object.assign({
      data: { ...updateItemDictionaryDto },
      statusCode: 201,
      message: `updated successfully`
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.itemDictionaryService.remove(id);
    return Object.assign({
      statusCode: 201,
      message: `deleted successfully`
    });
  }
}
