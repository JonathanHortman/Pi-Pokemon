import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/LandingPage.css'
import pipokemon from '../images/pipokemon.png'
import video from '../images/wall.mp4'



const LandingPage = () => {
  return (
    <div className='pageImg' >

      <video className='videoTag' autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>

      <img className='pokemon' src={pipokemon} alt="" /> */

      <Link to='/home'>
        <div className='pokeCont'>
          <img className='pokeball' src='https://www.downloadclipart.net/large/pokeball-transparent-background.png' />
          <img className='pokeballPhone' src='https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif' />
        </div>
      </Link>

    </div>
  )
}

export default LandingPage