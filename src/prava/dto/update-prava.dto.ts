import { PartialType } from '@nestjs/mapped-types';
import { CreatePravaDto } from './create-prava.dto';

export class UpdatePravaDto extends PartialType(CreatePravaDto) {}
