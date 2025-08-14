import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { ConfigModule } from '@nestjs/config';

describe('EnvConfigService Unit Tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the port number', () => {
    expect(sut.getAppPort()).toBe(3000);
  });

  it('should return the node environment', () => {
    expect(sut.getNodeEnv()).toBe('test');
  });
});
