import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XodimService } from './xodim.service';

@Controller('xodim')
export class XodimController {
  constructor(private readonly xodimService: XodimService) {}

  
}
