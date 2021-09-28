import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './pokemon.dto';
import { PokemonRepository } from './pokemon.repository';

@Injectable()
export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}

  public async getPokemons(pageNumber = 1, pageSize = 10): Promise<Pokemon[]> {
    return this.pokemonRepository.getPokemons(pageNumber, pageSize);
  }

  public async getPokemonByName(name: string): Promise<Pokemon> {
    return this.pokemonRepository.getPokemonByName(name);
  }

  public async updatePokemonByName(
    name: string,
    pokemon: Partial<Pokemon>,
  ): Promise<Pokemon> {
    const updatedPokemon = await this.pokemonRepository.updatePokemonByName(name, pokemon);
    
    if(!updatedPokemon) {
        throw new NotFoundException(`Pokemon ${name} not found`);
    }

    return updatedPokemon;
  }

  public async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const newPokemon = await this.pokemonRepository.createPokemon(pokemon);

    if(!newPokemon) {
      throw new ConflictException();
    }

    return newPokemon;
  }

  public async deletePokemonByName(name: string): Promise<boolean> {
    return this.pokemonRepository.deletePokemonByName(name);
  }
}
