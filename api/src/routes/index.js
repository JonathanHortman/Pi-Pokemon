const axios = require('axios');
const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();


//api

const getPokeapi = async () => {
  try {
    const request = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=100&limit=108');
    const subRequest = request.data.results.map(obj => axios.get(obj.url));
    //me devolvio muchas Promise { <pending> }
    const pokemonsData = await axios.all(subRequest);
    //me trajo todos los pokemones (solicitudes simultaneas) 
    let pokemons = pokemonsData.map(obj => obj.data);
    //obtengo la data de cada pokemon por su suburl
    let informacionPokemons = pokemons.map(pokemon => objPokeApi(pokemon))

    return informacionPokemons

  } catch (error) {
    console.log(error);
    return error;
  }
};


const objPokeApi = (poke) => {

  const objPokeapi = {
    id: poke.id,
    name: poke.name,
    types: poke.types.map(t => t.type.name),
    hp: poke.stats[0].base_stat,
    image: poke.sprites.other.dream_world.front_default,
    attack: poke.stats[1].base_stat,
    defense: poke.stats[2].base_stat,
    speed: poke.stats[5].base_stat,
    height: poke.height,
    weight: poke.weight,

  };
  return objPokeapi
};



//db

const getPokedb = async () => {

  const pokemonDb = await Pokemon.findAll({
    include: Type
  });


  const objPokeDb = pokemonDb.map(p => {
    return {
      id: p.dataValues.id,
      name: p.dataValues.name,
      types: p.dataValues.types && p.dataValues.types.map(t => t.name),
      hp: p.dataValues.hp,
      image: p.dataValues.image,
      attack: p.dataValues.attack,
      defense: p.dataValues.defense,
      speed: p.dataValues.speed,
      height: p.dataValues.height,
      weight: p.dataValues.weight,
      createdInDb: p.dataValues.createdInDb
    };
  })

  try {
    return objPokeDb
  } catch (err) {
    console.log(err);
  }
}


//api+db


const getAllPoke = async () => {
  try {
    const apiPokeData = await getPokeapi();
    const dbPokeData = await getPokedb();
    return [...apiPokeData, ...dbPokeData];

  } catch (error) {
    console.log(error);
    return error;
  }
};

////////
const addTypesToDb = async () => {
  try {
    const axiosApiReq = await axios.get('https://pokeapi.co/api/v2/type')
    const result = axiosApiReq.data.results
    result.map(t => {
      Type.create({
        name: t.name
      })
    })

  } catch (error) {
    console.log(error)
  }
}
addTypesToDb()


const getTypesFromDb = async () => {
  const bringingTypes = await Type.findAll();
  return bringingTypes;
}
////////


const pokeApi = async (name) => {
  try {
    const pokeApiUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/" + name
    );
    const results = pokeApiUrl.data;

    const pokemonInfo = {
      id: results.id,
      name: results.name,
      types: results.types.map(t => t.type.name),
      hp: results.stats[0].base_stat,
      image: results.sprites.other.dream_world.front_default,
      attack: results.stats[1].base_stat,
      defense: results.stats[2].base_stat,
      speed: results.stats[5].base_stat,
      height: results.height,
      weight: results.weight,
    };

    return pokemonInfo;
  } catch (error) {
    console.log(error)
  }
};

router.get('/pokemons', async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    const pokeNameApi = await pokeApi(name.toLowerCase());
    if (pokeNameApi) {
      return res.status(200).send([pokeNameApi])
    } else {
      const pokemonsDB = await getPokedb();
      const pokemon = pokemonsDB.filter(p => p.name.toLowerCase() == name.toLowerCase());
      return pokemon.length ? res.status(200).send(pokemon) : res.status(404).json('pokemon not found');
    }
  } else {
    const allPokemons = await getAllPoke();
    return res.status(200).send(allPokemons);
  }
})



router.get('/pokemons/:idPokemon', async (req, res, next) => {
  try {
    const { idPokemon } = req.params
    let pokemon
    if (typeof idPokemon === 'string' && idPokemon.length > 8) {
      pokemon = await Pokemon.findAll({
        include: {
          model: Type
        },
        where: {
          id: idPokemon
        }
      })
      let ResultOfSearch = pokemon.map(e => {
        let nue = e.dataValues
        return {
          id: nue.id,
          name: nue.name,
          types: nue.types.map(e => e.dataValues.name),
          hp: nue.hp,
          image: nue.image,
          imagetwo: null,
          attack: nue.attack,
          defense: nue.defense,
          speed: nue.speed,
          height: nue.height,
          weight: nue.weight,

        }
      })
      res.send(ResultOfSearch[0])
    } else {
      let response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + idPokemon)
      pokemon = response.data

      const pokeObject = (poke) => {
        return {
          id: poke.id,
          name: poke.name,
          types: poke.types.map(t => t.type.name),
          hp: poke.stats[0].base_stat,
          image: poke.sprites.other.dream_world.front_default,
          imagetwo: poke.sprites.versions['generation-v']['black-white'].animated.front_default,
          attack: poke.stats[1].base_stat,
          defense: poke.stats[2].base_stat,
          speed: poke.stats[5].base_stat,
          height: poke.height,
          weight: poke.weight
        }
      }
      res.send(pokeObject(pokemon))
    }

  } catch (error) {
    next(error)
  }
})

router.post('/pokemons', async (req, res, next) => {
  try {

    const { name, types, hp, image, attack, defense, speed, height, weight } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      types,
      hp,
      image,
      attack,
      defense,
      speed,
      height,
      weight
    })

    const pokemonTypes = await Type.findAll({
      where: {
        name: types
      }
    })

    newPokemon.addType(pokemonTypes)
    return res.send(newPokemon)

  } catch (error) {
    next()
  }
})

router.get('/types', async (req, res, next) => {
  try {
    const result = await getTypesFromDb()
    res.json(result);
  } catch (error) {
    next(error)
  }
})


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
module.exports = router;
