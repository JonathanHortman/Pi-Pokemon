import axios from 'axios'
export const GET_POKEMONS = 'GET_POKEMONS'
export const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS'
export const SORT = 'SORT'
export const POST_POKEMON = 'POST_POKEMON'
export const SORTBYATTACK = 'SORTBYATTACK'
export const SORTCREATED = 'SORTCREATED'
export const GET_TYPES = 'GET_TYPES'
export const SORT_TYPES = 'SORT_TYPES'


export function getPokemons() {
    return function (dispatch) {
        axios.get('/pokemons')
            .then(res => {
               return dispatch({
                    type: GET_POKEMONS,
                    payload: res.data
                })
            })
    }
}

export function getTypes() {
    return function (dispatch) {
        axios.get("/types")
            .then(res => {
                dispatch({
                    type: GET_TYPES,
                    payload: res.data
                })
            })
    }
}

export function searchCharacters(name) {
    return function (dispatch) {
        axios.get('/pokemons?name=' + name)
            .then(res => {
                dispatch({
                    type: SEARCH_CHARACTERS,
                    payload: res.data
                })
            })

    }
}

export function sort(payload) {
    return {
        type: SORT,
        payload
    }
}

export function sortCreated(payload) {
    return {
        type: SORTCREATED,
        payload
    }
}

export function sortByAttack(payload) {
    return {
        type: SORTBYATTACK,
        payload
    }
}

export function sortTypes(payload) {
    return {
        type: SORT_TYPES,
        payload
    }
}



export function postPokemon(payload) {
    return async function (dispatch) {
        const pokemon = await axios.post("/pokemons", payload)
        return {
            type: POST_POKEMON,
            payload: pokemon
        }
    }
}