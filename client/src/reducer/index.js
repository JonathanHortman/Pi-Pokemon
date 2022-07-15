import { SORT_TYPES, GET_TYPES, GET_POKEMONS, POST_POKEMON, SORTCREATED, SEARCH_CHARACTERS, SORT, SORTBYATTACK } from '../actions'
import { ASCENDENTE, STRONG, CREADOS, ALL } from '../constantes/sort'

const initialState = {
    pokemons: [],
    filteredPokemons: [],
    types: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                filteredPokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case SEARCH_CHARACTERS:
            return {
                ...state,
                filteredPokemons: action.payload
            }
            
            
            case SORT:
            let orderedPokemons = [...state.pokemons]
            orderedPokemons = orderedPokemons.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            return {
                ...state,
                filteredPokemons: orderedPokemons
            }
            

        case SORTBYATTACK:
            let orderedPokemonsAtk = [...state.pokemons]
            orderedPokemonsAtk = orderedPokemonsAtk.sort((a, b) => {
                if (a.attack < b.attack) {
                    return action.payload === STRONG ? -1 : 1;
                }
                if (a.attack > b.attack) {
                    return action.payload === STRONG ? 1 : -1;
                }
                return 0;
            })
            return {
                ...state,
                filteredPokemons: orderedPokemonsAtk
            }

        case SORTCREATED:
            const allPokemons = state.pokemons
            const createdFilter = action.payload === CREADOS ? allPokemons.filter(p => p.createdInDb) : allPokemons.filter(p => !p.createdInDb)
            return {
                ...state,
                filteredPokemons: action.payload === ALL ? allPokemons : createdFilter.length ? createdFilter : ['not found']
            }

        case SORT_TYPES:
            const allPokemons2 = state.pokemons;
            const typeFilter = action.payload === "All types" ? allPokemons2 : allPokemons2.filter(p => p.types.includes(action.payload))
            return {
                ...state,
                filteredPokemons: typeFilter.length ? typeFilter : [`not found`]
            }

        case POST_POKEMON:
            return {
                ...state,
                filteredPokemons: action.payload
            }

        default:
            return state
    }
}
