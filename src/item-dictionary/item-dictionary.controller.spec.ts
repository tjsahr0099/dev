import { Test, TestingModule } from '@nestjs/testing';
import { ItemDictionaryController } from './item-dictionary.controller';
import { ItemDictionaryService } from './item-dictionary.service';

describe('ItemDictionaryController', () => {
  let controller: ItemDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemDictionaryController],
      providers: [ItemDictionaryService],
    }).compile();

    controller = module.get<ItemDictionaryController>(ItemDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
