import { Test, TestingModule } from '@nestjs/testing';
import { WeryfikacjaService } from 'src/weryfikacja/weryfikacja.service';
import SamochodController from './samochod.controller';
import SamochodService from './samochod.service';

describe('SamochodController', () => {
  let controller: SamochodController;

  const mockSamochodService = {};

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
});
