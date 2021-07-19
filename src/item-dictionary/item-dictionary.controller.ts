import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemDictionaryService } from './item-dictionary.service';
import { CreateItemDictionaryDto } from './dto/create-item-dictionary.dto';
import { UpdateItemDictionaryDto } from './dto/update-item-dictionary.dto';

@Controller('item-dictionary')
export class ItemDictionaryController {
  constructor(private readonly itemDictionaryService: ItemDictionaryService) {}

  @Post()
  async create(@Body() createItemDictionaryDto: CreateItemDictionaryDto) {
    return await this.itemDictionaryService.create(createItemDictionaryDto);
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
  update(@Param('id') id: string, @Body() updateItemDictionaryDto: UpdateItemDictionaryDto) {
    return this.itemDictionaryService.update(id, updateItemDictionaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemDictionaryService.remove(id);
  }
}