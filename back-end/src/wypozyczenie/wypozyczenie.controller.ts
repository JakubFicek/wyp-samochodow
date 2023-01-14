import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { edytujWypozyczenieDto } from './dto/edytujWypozyczenie.dto';
import { WypozyczenieDto } from './dto/wypozyczenie.dto';
import WypozyczenieService from './wypozyczenie.service';

@Controller('wypozyczenie')
export default class WypozyczenieController {
  constructor(private readonly wypozyczenieSerive: WypozyczenieService) {}

  @Get('znajdz/:id')
  async znajdzWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieSerive.znajdzWypozyczenie(Number(id));
  }
}
