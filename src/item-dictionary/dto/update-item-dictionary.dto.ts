import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { CreateItemDictionaryDto } from './create-item-dictionary.dto';

export class UpdateItemDictionaryDto extends PartialType( OmitType(CreateItemDictionaryDto, ['no','class','subClass'] as const) ) {}
