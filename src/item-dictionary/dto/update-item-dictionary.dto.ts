import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDictionaryDto } from './create-item-dictionary.dto';

export class UpdateItemDictionaryDto extends PartialType(CreateItemDictionaryDto) {}
