import { PartialType } from '@nestjs/mapped-types';
import { CreateJarimaDto } from './create-jarima.dto';

export class UpdateJarimaDto extends PartialType(CreateJarimaDto) {}
