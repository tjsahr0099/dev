import { Test, TestingModule } from '@nestjs/testing';
import { ItemDictionaryService } from './item-dictionary.service';

describe('ItemDictionaryService', () => {
  let service: ItemDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemDictionaryService],
    }).compile();

    service = module.get<ItemDictionaryService>(ItemDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
