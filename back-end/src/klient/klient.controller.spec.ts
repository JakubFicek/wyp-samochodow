import { Test, TestingModule } from '@nestjs/testing';
import KlientController from './klient.controller';
import KlientService from './klient.service';
import { KlientDto } from './dto/klient.dto';
import { boolean } from '@hapi/joi';
import { Repository } from 'typeorm';
import Klient from './klient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('KlientController', () => {
  let controller: KlientController;

  const mockKlientService = {
    zwrocWszystkich: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
  };

  const mockKlient = {
    imie: 'imie',
    nazwisko: 'nazwisko',
    haslo: 'haslo',
    pesel: 'pesel',
    czy_jest_prawo_jazdy: true,
    wiek: 1,
    email: 'email@email.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KlientController],
      providers: [KlientService],
    })
      .overrideProvider(KlientService)
      .useValue(mockKlientService)
      .compile();

    controller = module.get<KlientController>(KlientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('powinno zwracać klienta', async () => {
    const odp = await controller.wypiszKlientow();
    expect(odp).toEqual({
      ...odp,
    });
  });
});
