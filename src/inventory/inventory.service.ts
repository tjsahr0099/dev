import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commonConst } from 'src/common/const/common.const';
import { CreateItemDictionaryDto } from 'src/item-dictionary/dto/create-item-dictionary.dto';
import { ItemDictionary } from 'src/item-dictionary/entities/item-dictionary.entity';
import { ItemDictionaryService } from 'src/item-dictionary/item-dictionary.service';
import { EntityManager, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryItem } from './entities/inventory-item.entity';
import { InventoryMaster } from './entities/inventory-master.entity';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(InventoryMaster) private inventoryMasterRepository: Repository<InventoryMaster>,
    @InjectRepository(InventoryItem) private inventoryItemRepository: Repository<InventoryItem>,
    private readonly itemDictionaryService: ItemDictionaryService,    
    ){
    this.inventoryMasterRepository = inventoryMasterRepository;
    this.inventoryItemRepository = inventoryItemRepository;
    this.itemDictionaryService = itemDictionaryService;
  }

    //인벤토리에 아이템 저장
  async saveItem(createInventoryDto: CreateInventoryDto){

    const item = await this.findfirstEmptyInventorySpace(createInventoryDto);
    console.log(item);
    await this.inventoryItemRepository.save(item.saveItem);    
   
    if(item.remainItem!=null){
      return await this.saveItem(item.remainItem);
    }
   

  }

  //인벤토리 저장위치 계산 ( 첫번째 빈 공간 또는 첫번째 같은 아이템 찾기 )
  async findfirstEmptyInventorySpace(createInventoryDto: CreateInventoryDto){

    const inventoryId = createInventoryDto.inventoryId;
    const dictionaryId = createInventoryDto.dictionaryId;
    const inputItemCnt = createInventoryDto.cnt;

    let itemDic = new CreateItemDictionaryDto();
    itemDic.id = dictionaryId;

    const maxX = commonConst.maxInventoryXSize;
    const maxY = commonConst.maxInventoryYSize;

    let x = 0;
    let y = 0;

    // 아.. 디비에 저장하지 않으면 여기가 꼬인다..
    const existSameItems = await this.findByItemId(dictionaryId);

    console.log("existSameItems.length : " + existSameItems.length)

    //습득한 아이템이 인벤토리에 있으면 가장 위 아이템에 +적재
    if(existSameItems.length!=0){      
      console.log("습득한 아이템과 현재 포지션의 아이템의 아이디가 같으면 해당 칸에 적재");

      x = existSameItems[0].x;
      y = existSameItems[0].y;

      // max size 계산
      const calresult = await this.calMaxSize(dictionaryId, inputItemCnt, existSameItems[0].cnt);

      const saveItem = createInventoryDto;
      saveItem.x = x;
      saveItem.y = y;
      saveItem.cnt = calresult.saveCnt;
      saveItem.dictionary = itemDic;

      if(calresult.remainCnt!=0){
        createInventoryDto.cnt = calresult.remainCnt;
        return { saveItem: saveItem, remainItem: Object.assign([], createInventoryDto) };
      }else{        
        return { saveItem: saveItem, remainItem: null };
      }
       
    }

    const items = await this.findById(inventoryId);
    // let counter = 0;

    //forEach는 모든 element를 체크할때 까지 멈출 수 없다. => for문으로 변경
    //첫 번째 빈 칸 찾기 루프
    let index = 0;
    for (index = 0; index < items.length; index++) {
      const item = items[index];

      let invenCnt = item.y*maxY+item.x;
      console.log(invenCnt + "번째 아이템 체크 counter:" + index);
      
      //다음 아이템이 현재 포지션에 맞지 않으면 빈칸이므로 포지션 체크
      if(index<invenCnt){
        console.log("다음 아이템이 현재 포지션에 맞지 않으면 빈칸이므로 포지션 체크");
        x = index%maxY;
        y = Math.floor(index/maxY);

        break;
      } 
     
    }
    
    //위 두 조건에 해당하는 아이템이 없을 경우 ( index가 마지막 length까지 돌았는가? )
    if(index==items.length){
      x = items.length%maxY;
      y = Math.floor(items.length/maxY);
      console.log("마지막 칸에 적재 x:" + x + " y:"+ y);
    }

    // max size 계산
    const calresult = await this.calMaxSize(dictionaryId, inputItemCnt, 0);

    const saveItem = createInventoryDto;
    saveItem.x = x;
    saveItem.y = y;
    saveItem.cnt = calresult.saveCnt;
    saveItem.dictionary = itemDic;

    if(calresult.remainCnt!=0){      
      createInventoryDto.cnt = calresult.remainCnt;
      return { saveItem: saveItem, remainItem: Object.assign([], createInventoryDto) };
    }else{        
      return { saveItem: saveItem, remainItem: null };
    }

  }
  
  async calMaxSize(dictionaryId: string, inputItemCnt: number, existItemCnt: number) {

    const itemDictionary = await this.itemDictionaryService.findOne(dictionaryId);
    let remainCnt = 0;
    // max size 계산
    const maxStackSize = itemDictionary.maxStackSize;
    if(maxStackSize < inputItemCnt + existItemCnt ){
      console.log("아이템이 맥스사이즈를 넘음");
      remainCnt = inputItemCnt + existItemCnt - maxStackSize;
      inputItemCnt = maxStackSize;
      
    }else{
      inputItemCnt = inputItemCnt + existItemCnt;      
    }

    return { saveCnt: inputItemCnt, remainCnt: remainCnt };
  }

  async findById(inventoryId: string): Promise<InventoryItem[]>{
    return this.inventoryItemRepository
    .createQueryBuilder('inventoryItem')
    .where('inventoryItem.inventoryId = :inventoryId',{ inventoryId: inventoryId })
    .orderBy('y','ASC').addOrderBy('x','ASC')
    .getMany();
  }

  async findByItemId(dictionaryId: string): Promise<InventoryItem[]>{
    return this.inventoryItemRepository
    .createQueryBuilder('inventoryItem')
    .innerJoinAndSelect('inventoryItem.dictionary','dictionary')
    .where('inventoryItem.dictionaryId = :dictionaryId',{ dictionaryId: dictionaryId })
    .andWhere('inventoryItem.cnt < dictionary.maxStackSize')
    .orderBy('y','ASC').addOrderBy('x','ASC')
    .getMany();
  }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: string) {
    return `This action returns a #${id} inventory`;
  }

  update(id: string, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: string) {
    return `This action removes a #${id} inventory`;
  }
}

