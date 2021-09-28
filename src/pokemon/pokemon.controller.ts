import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Response, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../validation/validation.pipe';
import { Pokemon } from './pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    
    constructor(private pokemonService: PokemonService) {}

    @Get()
    async listPokemons(@Response() res, @Query() query) {
        const pokemons = await this.pokemonService.getPokemons(query.pageNumber, query.pageSize)
        res.status(HttpStatus.OK).json(pokemons);
    }

    @Get(':name')
    async getPokemonByName(@Response() res, @Param('name') name) {
        const pokemon = await this.pokemonService.getPokemonByName(name);
        if(!pokemon) {
            return res.status(HttpStatus.NOT_FOUND).json();
        }
        res.status(HttpStatus.OK).json(pokemon);
    }

    @Put(':name')
    @UsePipes(new ValidationPipe(['update']))
    async updatePokemonByName(@Response() res, @Param('name') name, @Body() body: Pokemon) {
        const updatedPokemon = await this.pokemonService.updatePokemonByName(name, body);
        res.status(HttpStatus.OK).json(updatedPokemon);
    }

    @Post()
    @UsePipes(new ValidationPipe(['creation']))
    async createPokemon(@Response() res,  @Body() body: Pokemon) {
        const pokemon = await this.pokemonService.createPokemon(body);
        res.status(HttpStatus.OK).json(pokemon);
    }

    @Delete(':name')
    async deletePokemonByName(@Response() res, @Param('name') name) {
        await this.pokemonService.deletePokemonByName(name);
        res.status(HttpStatus.OK).json();
    }


}
