
# Pokemon API

This is an API written in Typescript using [Nestjs](https://docs.nestjs.com/) that exposes a CRUD service for Pokemon, using a [CSV file](https://gist.github.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6/) as a database.

You can see a description of the endpoints by visiting the swagger docs at [csv-pokemon-api.herokuapp.com/api](https://csv-pokemon-api.herokuapp.com/api)

Insomnia and Postman JSON descriptions are also available in the project for quickly importing the endpoint definitions.

### Approach 
Upon starting the application, the csv file with the pokemons is read into memory as an array, and then mutation endpoints (such as Create, Update and Delete) update this array and replace the file contents. 

- This approach could would not be viable for extremely large list, as it's limited by the memory size, but for a finite list of pokemons I thought I'd be fine.

- class-validator and class-transformer are used to validate the Pokemon DTO when creating or updating them.

- Unhandled exceptions are handled by a Global Exception filter

## Running locally

To run locally, simply install the dependencies using npm, and run the start script:

```bash
npm install
npm start
```
It uses [dotenv](https://github.com/motdotla/dotenv) to read an `PORT` variable from a .env file at the root of the project. Or defaulting to port 8080.



## License
[MPL 2.0](https://choosealicense.com/licenses/mpl-2.0/)

