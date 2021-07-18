import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commonConst } from 'src/common/const/common.const';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryItem } from './entities/inventory-item.entity';
import { InventoryMaster } from './entities/inventory-master.entity';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(InventoryMaster) private inventoryMasterRepository: Repository<InventoryMaster>,
    @InjectRepository(InventoryItem) private inventoryItemRepository: Repository<InventoryItem>
    ){
    this.inventoryMasterRepository = inventoryMasterRepository;
    this.inventoryItemRepository = inventoryItemRepository;
  }

  //인벤토리에 아이템 저장
  async saveItem(createInventoryDto: CreateInventoryDto){

    const posNcnt = await this.findfirstEmptyInventorySpace(createInventoryDto.inventoryId, createInventoryDto.itemId);

    createInventoryDto.x = posNcnt.x;
    createInventoryDto.y = posNcnt.y;
    createInventoryDto.cnt += posNcnt.cnt;
    console.log("최종 입력 : x:" + createInventoryDto.x + " y:" + createInventoryDto.y + " cnt : " + createInventoryDto.cnt);
    await this.inventoryItemRepository.save(createInventoryDto);

  }

  //인벤토리 저장위치 계산 ( 첫번째 빈 공간 또는 첫번째 같은 아이템 찾기 )
  async findfirstEmptyInventorySpace(inventoryId: string, itemId: string){
    const maxX = commonConst.maxInventoryXSize;
    const maxY = commonConst.maxInventoryYSize;

    let x = 0;
    let y = 0;
    let cnt = 0;

    const saveItems = await this.findByItemId(itemId);

    //습득한 아이템이 인벤토리에 있으면 가장 위 아이템에 +적재
    if(saveItems.length!=0){      
      console.log("습득한 아이템과 현재 포지션의 아이템의 아이디가 같으면 해당 칸에 적재");
      x = saveItems[0].x;
      y = saveItems[0].y;
      cnt = saveItems[0].cnt;
      return { x: x, y: y, cnt: cnt };
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
        cnt = 0;
        break;
      } 
      
    }

    //위 두 조건에 해당하는 아이템이 없을 경우 ( index가 마지막 length까지 돌았는가? )
    if(index==items.length){
      x = items.length%maxY;
      y = Math.floor(items.length/maxY);
      console.log("마지막 칸에 적재 x:" + x + " y:"+ y);
    }

    return { x: x, y: y, cnt: cnt };
  }
  

  async findById(inventoryId: string): Promise<InventoryItem[]>{
    return this.inventoryItemRepository
    .createQueryBuilder('inventoryItem')
    .where('inventoryItem.inventoryId = :inventoryId',{ inventoryId: inventoryId })
    .orderBy('y','ASC').addOrderBy('x','ASC')
    .getMany();
  }

  async findByItemId(itemId: string): Promise<InventoryItem[]>{
    return this.inventoryItemRepository
    .createQueryBuilder('inventoryItem')
    .where('inventoryItem.itemId = :itemId',{ itemId: itemId })
    .orderBy('y','ASC').addOrderBy('x','ASC')
    .getMany();
  }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}

