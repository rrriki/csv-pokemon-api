import { Test, TestingModule } from '@nestjs/testing';
import { PokemonModule } from '../pokemon/pokemon.module';
import { PokemonTypes } from '../pokemon/pokemon.dto';
import { PokemonRepository } from '../pokemon/pokemon.repository';
import { PokemonService } from '../pokemon/pokemon.service';

describe('PokemonController', () => {
  let service: PokemonService;
  let repository: PokemonRepository;

  const pikachuMock = {
    '#': 25,
    name: 'Pikachu',
    type_1: PokemonTypes.Electric,
    total: 320,
    hp: 35,
    attack: 55,
    defense: 40,
    sp_attack: 50,
    sp_defense: 50,
    speed: 90,
    generation: 1,
    isLegendary: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PokemonModule],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<PokemonRepository>(PokemonRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw a conflict error if the pokemon name already exists', async () => {
    const spyOnCreate = jest.spyOn(repository, 'createPokemon')
    spyOnCreate.mockResolvedValue(null);

    await expect(
      service.createPokemon(pikachuMock),
    ).rejects.toThrow('Conflict');
  });

  it('should merge current pokemon to allow for partial updates', async () => {

    repository['inMemory'] = [pikachuMock];
    
    jest.spyOn(repository, 'writeContentsToFile' as any).mockResolvedValue(null);

    const updated = await service.updatePokemonByName('pikachu', {
      type_1: PokemonTypes.Fire,
      type_2: PokemonTypes.Ice,
    });

    expect(updated).toEqual({...pikachuMock, type_1: PokemonTypes.Fire, type_2: PokemonTypes.Ice});
  });
});
