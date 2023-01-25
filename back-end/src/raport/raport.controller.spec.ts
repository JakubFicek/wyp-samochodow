import { Test, TestingModule } from '@nestjs/testing';
import RaportController from './raport.controller';
import RaportService from './raport.service';
import { RaportDto } from './dto/raport.dto';
import { boolean } from '@hapi/joi';
import { Repository } from 'typeorm';
import Raport from './raport.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RequestPracownik } from 'src/typy/requestPracownik.interface';

describe('KlientController', () => {
  let controller: RaportController;

  const mockRaportService = {
    stworzRaport: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    wypiszOstatniRaport: jest.fn(() => {
      return {
        ...mockRaport,
      };
    }),
  };

  const mockRaport = {
    id: 1,
    il_wypozyczen: 1,
    kto_sporzadzil: 1,
    wszystkie_wypozyczenia: '[wypozyczenia]',
    wszystkie_rezerwacje: '[rezerwacje]',
    data_stworzenia: Date.now(),

    przychod: 0,
  };
  const mockPracownik = {
    id_w_konkretnej_bd: 1,
    id: 1,
    // imie: "imie",
    // nazwisko: "nazwisko",
    // email: "email@email.com",
    // haslo: "haslo",
    // typ_umowy: "typ umowy",
    // data_zadtrudnienia: Date.now(),
    // wynagrodzenie: 0,
    // rola: "Sprzedawca",
  } as unknown as RequestPracownik;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaportController],
      providers: [RaportService],
    })
      .overrideProvider(RaportService)
      .useValue(mockRaportService)
      .compile();

    controller = module.get<RaportController>(RaportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('powinno zwracać ostatni raport', async () => {
    const odp = await controller.wypiszOstatniRaport();
    expect(odp).toEqual({
      ...mockRaport,
    });
  });
});
