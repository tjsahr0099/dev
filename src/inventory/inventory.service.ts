import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commonConst } from 'src/common/const/common.const';
import { CreateItemDictionaryDto } from 'src/item-dictionary/dto/create-item-dictionary.dto';
import { ItemDictionary } from 'src/item-dictionary/entities/item-dictionary.entity';
import { ItemDictionaryService } from 'src/item-dictionary/item-dictionary.service';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
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

    console.log("=========DB SAVE START==========")    
    console.log(item.saveItem);    
    await this.inventoryItemRepository.save(item.saveItem);    
    console.log("=========DB SAVE END============")
   
    if(item.remainItem!=null){
      return await this.saveItem(item.remainItem);
    }
   

  }

  //인벤토리 저장위치 계산 ( 첫번째 빈 공간 또는 첫번째 같은 아이템 찾기 )
  async findfirstEmptyInventorySpace(createInventoryDto: CreateInventoryDto){

    const inventoryId = createInventoryDto.inventoryId;
    const dictionaryId = createInventoryDto.item.dictionaryId;
    const inputItemCnt = createInventoryDto.cnt;

    let item = new CreateItemDto();
    item.id = dictionaryId;

    const maxX = commonConst.maxInventoryXSize;
    const maxY = commonConst.maxInventoryYSize;

    let x = 0;
    let y = 0;

    console.log("======인벤토리 중복 아이템 체크 시작=========");
    const existSameItems = await this.findByItemId(dictionaryId);

    console.log("existSameItems.length : " + existSameItems.length)

    //습득한 아이템이 인벤토리에 있으면 가장 위 아이템에 +적재
    if(existSameItems.length!=0){      
      
      x = existSameItems[0].x;
      y = existSameItems[0].y;

      console.log("습득한 아이템이 인벤토리에 존재함 x:"+x+" y:"+y);

      // max size 계산
      const calresult = await this.calMaxSize(dictionaryId, inputItemCnt, existSameItems[0].cnt);

      const saveItem = Object.assign({}, createInventoryDto);
      console.log("1",JSON.parse(JSON.stringify(saveItem)));
      saveItem.x = x;
      saveItem.y = y;
      saveItem.cnt = calresult.saveCnt;
      saveItem.item = item;
      console.log("2",JSON.parse(JSON.stringify(saveItem)));

      if(calresult.remainCnt!=0){        
        createInventoryDto.cnt = calresult.remainCnt;
        console.log("======인벤토리 중복 아이템 체크 종료1=========");
        return { saveItem: saveItem, remainItem: Object.assign({}, createInventoryDto) };
      }else{        
        console.log("======인벤토리 중복 아이템 체크 종료2=========");
        return { saveItem: saveItem, remainItem: null };
      }
       
    }

    
    console.log("======인벤토리 빈칸 체크 시작========");

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

    const saveItem = Object.assign({}, createInventoryDto);
    saveItem.x = x;
    saveItem.y = y;
    saveItem.cnt = calresult.saveCnt;
    saveItem.item = item;

    if(calresult.remainCnt!=0){      
      createInventoryDto.cnt = calresult.remainCnt;
      console.log("======인벤토리 빈칸 체크 종료1========");
      return { saveItem: saveItem, remainItem: Object.assign({}, createInventoryDto) };
    }else{        
      console.log("======인벤토리 빈칸 체크 종료2========");
      return { saveItem: saveItem, remainItem: null };
    }
    
  }
  
  async calMaxSize(dictionaryId: string, inputItemCnt: number, existItemCnt: number) {

    const itemDictionary = await this.itemDictionaryService.findOne(dictionaryId);
    let remainCnt = 0;
    let saveCnt = 0;
    // max size 계산
    const maxStackSize = itemDictionary.maxStackSize;
    if(maxStackSize < inputItemCnt + existItemCnt ){
      remainCnt = inputItemCnt + existItemCnt - maxStackSize;
      saveCnt = maxStackSize;
      console.log("아이템이 맥스사이즈를 넘음. saveCnt:"+saveCnt+" remainCnt:"+remainCnt);
      
    }else{
      saveCnt = inputItemCnt + existItemCnt;      
    }

    return { saveCnt: saveCnt, remainCnt: remainCnt };
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

