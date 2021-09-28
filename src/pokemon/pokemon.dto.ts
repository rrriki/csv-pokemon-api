import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as _ from 'lodash';

export enum PokemonTypes {
  Grass = 'Grass',
  Fire = 'Fire',
  Water = 'Water',
  Bug = 'Bug',
  Normal = 'Normal',
  Poison = 'Poison',
  Electric = 'Electric',
  Ground = 'Ground',
  Fairy = 'Fairy',
  Fighting = 'Fighting',
  Psychic = 'Psychic',
  Rock = 'Rock',
  Ghost = 'Ghost',
  Ice = 'Ice',
  Dragon = 'Dragon',
  Dark = 'Dark',
  Steel = 'Steel',
  Flying = 'Flying',
}

const invalidPokemonTypeMessage = `Must be a valid pokemon type: ${_.values(PokemonTypes).join(',')}`

export class Pokemon {
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  '#': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsString()
  'name': string;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsEnum(PokemonTypes, {
    message: `type_1: ${invalidPokemonTypeMessage}`,
  })
  'type_1': PokemonTypes;
  @ApiProperty()
  @IsOptional()
  @IsEnum(PokemonTypes, {
    message: `type_2: ${invalidPokemonTypeMessage}`,
  })
  'type_2'?: PokemonTypes;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'total': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'hp': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'attack': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'defense': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'sp_attack': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'sp_defense': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'speed': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsNumber()
  'generation': number;
  @ApiProperty()
  @IsNotEmpty({groups: ['creation']})
  @IsBoolean()
  'isLegendary': boolean;
}
