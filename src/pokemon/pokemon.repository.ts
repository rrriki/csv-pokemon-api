import { Injectable } from '@nestjs/common';
import { parse, stringify } from 'csv';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { Pokemon } from './pokemon.dto';

@Injectable()
export class PokemonRepository {
  private filePath = path.resolve(process.env.PWD, 'pokemons.csv');
  private columnNames = [
    '#',
    'name',
    'type_1',
    'type_2',
    'total',
    'hp',
    'attack',
    'defense',
    'sp_attack',
    'sp_defense',
    'speed',
    'generation',
    'isLegendary',
  ];
  private inMemory: Pokemon[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    this.inMemory = await this.readPokemonFile();
  }

  private async readPokemonFile(): Promise<Pokemon[]> {
    return new Promise((resolve, reject) => {
      const pokemon: Pokemon[] = [];
      const parser = parse({ columns: this.columnNames, from: 2 });

      fs.createReadStream(this.filePath)
        .pipe(parser)
        .on('error', (error) => reject(error.message))
        // Cast values when reading the file, so the API gives consistent typing
        .on('data', (data) => pokemon.push({
          "#": +data['#'],
          "name": data.name,
          "type_1": data.type_1,
          "type_2": data.type_2 || undefined,
          "total": +data.total,
          "hp": +data.hp,
          "attack": +data.attack,
          "defense": +data.defense,
          "sp_attack": +data.sp_attack,
          "sp_defense": +data.sp_defense,
          "speed": +data.speed,
          "generation": +data.generation,
          "isLegendary": typeof data.isLegendary == 'string' ? _.toLower( data.isLegendary) == 'true' : data.isLegendary
        }))
        .on('end', () => resolve(pokemon));
    });
  }

  private findPokemonIndexByName(name: string): number {
    return this.inMemory.findIndex(
      (pokemon) => _.toLower(pokemon.name) === _.toLower(name),
    );
  }

  private async writeContentsToFile(): Promise<void> {
    return new Promise((resolve, reject) => {
      stringify(
        this.inMemory,
        {header: true , columns: this.columnNames },
        (error, output) => {
          if (error) {
            return reject(error.message);
          }

          fs.writeFileSync(this.filePath, output);
          resolve();
        },
      );
    });
  }

  public getPokemons(pageNumber: number, pageSize: number) {
    const start = (pageNumber - 1) * pageSize;
    const end = pageNumber * pageSize;
    return this.inMemory.slice(start, end);
  }

  public getPokemonByName(name: string): Pokemon {
    const index = this.findPokemonIndexByName(name);
    return this.inMemory[index];
  }

  public async updatePokemonByName(
    name: string,
    pokemon: Partial<Pokemon>,
  ): Promise<Pokemon> {
    
    const index = this.findPokemonIndexByName(name);

    if (index >= 0) {
      delete pokemon.name;
      const updated = _.merge(this.inMemory[index], pokemon);
      this.inMemory.splice(index, 1, updated);

      await this.writeContentsToFile();

      return updated;
    }

    return null;
  }

  public async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const index = this.findPokemonIndexByName(pokemon.name)

    if (index >= 0) {
      return null;
    }

    this.inMemory.push(pokemon);

    await this.writeContentsToFile();

    return pokemon;
  }

  public async deletePokemonByName(name: string): Promise<boolean> {
    const currentIndex = this.findPokemonIndexByName(name);
    if (currentIndex > 0) {
      this.inMemory.splice(currentIndex, 1);
      await this.writeContentsToFile();
      return true;
    }

    return false;
  }
}
