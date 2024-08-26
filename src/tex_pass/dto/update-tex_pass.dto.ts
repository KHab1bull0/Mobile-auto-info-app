import { PartialType } from '@nestjs/mapped-types';
import { CreateTexPassDto } from './create-tex_pass.dto';

export class UpdateTexPassDto extends PartialType(CreateTexPassDto) {}
