import { Test, TestingModule } from '@nestjs/testing';
import SamochodController from './samochod.controller';
import SamochodService from './samochod.service';
import { SamochodDto } from './dto/samochod.dto';
import { boolean } from '@hapi/joi';
import { Repository } from 'typeorm';
import Samochod from './samochod.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SamochodController', () => {
  let controller: SamochodController;

  const mockSamochodService = {
    dodaj_samochod: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    wypiszSamochody: jest.fn((samochod) => {
      return {
        samochod: Samochod,
      };
    }),
  };

  const mockSamochod = {
    id: 1,
    model: 'model_samochodu',
    marka: 'marka_samochodu',
    rok_produkcji: 1,
    przebieg: 1,
    cena_za_dzien: 1,
    il_miejsc: 1,
    stan_pojazdu: 'Dostepny',
    ksiazka_serwisowa: '',
    czy_sprawdzony: true,
    zajete_terminy: [[]],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SamochodController],
      providers: [SamochodService],
    })
      .overrideProvider(SamochodService)
      .useValue(mockSamochodService)
      .compile();

    controller = module.get<SamochodController>(SamochodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('powinno zwracać samochod', async () => {
    const odp = await controller.dodaj_samochod(mockSamochod);
    expect(odp).toEqual({
      ...mockSamochod,
    });
  });

  it('powinno zwrocic tablice samochodow', async () => {
    const odp = await controller.wypiszSamochody();
    expect(odp).toEqual({
      ...odp,
    });
  });
});
