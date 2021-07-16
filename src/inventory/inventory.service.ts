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

    await this.inventoryItemRepository.save(createInventoryDto);

  }

  //인벤토리 저장위치 계산 ( 첫번째 빈 공간 또는 첫번째 같은 아이템 찾기 )
  findfirstEmptyInventorySpace(inventoryId: string, itemId: string){
    const maxX = commonConst.maxInventoryXSize;
    const maxY = commonConst.maxInventoryYSize;

    let x = 0;
    let y = 0;
    let cnt = 0;

    const items = this.findById(inventoryId);

    items.then(items=>{

      let counter = 0;

      items.forEach(item => {

        let invenCnt = item.y*maxY+item.x;
        
        //다음 아이템이 현재 포지션에 맞지 않으면 빈칸이므로 포지션 체크
        if(counter<invenCnt){
          x = counter%maxY;
          y = Math.floor(counter/maxY);
          cnt = 0;
        } 

        //습득한 아이템과 현재 포지션의 아이템의 아이디가 같으면 해당 칸에 적재
        if(itemId==item.itemId){
          x = item.x;
          y = item.y;
          cnt = item.cnt;
          return;
        }

        counter++;
      });


    });


    
    return { x: x, y: y, cnt: cnt };
  }
  

  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  findById(inventoryId: string): Promise<InventoryItem[]>{
    return this.inventoryItemRepository
    .createQueryBuilder('inventoryItem')
    .where('inventoryItem.inventoryId = :inventoryId',{ inventoryId: inventoryId })
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

