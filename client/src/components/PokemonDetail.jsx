import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import s from '../Styles/PokemonDetail.module.css'
import pokedex from '../images/pokedexx.png'
import home from '../images/home.png'
import cuadro from '../images/cuadro.png'
// import pokeball from '../images/pokeball.png'

const PokemonDetail = () => {

  const [pokemon, setPokemon] = useState(null)
  let { idPokemon } = useParams()


  useEffect(() => {
    axios.get('http://localhost:3001/pokemons/' + idPokemon)
      .then(pokemon => {
        setPokemon(pokemon.data)
      })
  }, [])

  return (
    <div className={`${s.page}`}>
      <img className={`${s.cuadro}`} src={cuadro} alt="cuadro" />
      {
        pokemon ?
          <div>
            <div className={`${s.pokedexConteiner}`}>
              <img className={`${s.pokedex}`} src={pokedex} alt="cuadro" />
              <img className={`${s.animatedImg}`} src={pokemon.imagetwo} alt="ㅤ" />
            </div>
            <img className={`${s.bigImage}`} src={pokemon.image} alt='pokemon image' />
              <h3 className={`${s.name}`}>{pokemon.name}</h3>
            
            {
              pokemon.imagetwo?
              <img className={`${s.bigImage}`} src={pokemon.image} alt='pokemon image' />
              :<img className={`${s.animatedImg}`} src='https://cdn.pixabay.com/photo/2020/04/20/20/20/pokeball-5069721__340.png' alt="pokemon created" />
              
            }

            <div className={`${s.contDetails}`}>
              <div className={`${s.col1}`}>
                <div><b>Type: </b>{pokemon.types.map(t => (
                  <p>{t}</p>
                )
                )}
                </div>
              </div>

              <div className={`${s.col2}`}>
                <p><b>ㅤHp:ㅤ</b>{pokemon.hp}</p>
                <p><b>Speed: </b>{pokemon.speed}</p>
              </div>

              <div className={`${s.col3}`}>
                <p><b>Attack: </b>{pokemon.attack}</p>
                <p><b>Defense: </b>{pokemon.defense}</p>
              </div>

              <div className={`${s.col4}`}>
                <p><b>Height: </b>{pokemon.height}</p>
                <p><b>Weight: </b>{pokemon.weight}</p>
              </div>

              <div className={`${s.col6}`}>
                <p><b>ID:</b>{pokemon.id}</p>
              </div>
            </div>
            <img className={s.ash} src="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/90/latest/20130215053604/Ash_Ketchum_BW2.png/180px-Ash_Ketchum_BW2.png" alt="" />

          </div> :
          <div>
            <img className={`${s.loader}`} src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif" alt="loading" />
            <img className={`${s.loader2}`} src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
          </div>
      }
      <Link to='/home'>
        <img className={`${s.goHome}`} src={home} alt="loadimage" />
      </Link>

      <div className={`${s.conteinerDescriptionPhone}`} >
        <Link to='/home'>
          <button className={`${s.goHomePhone}`} >back</button>
        </Link>
      </div>

    </div>
  )
}

export default PokemonDetail
