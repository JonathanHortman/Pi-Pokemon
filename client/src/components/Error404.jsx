import React from 'react'
import error from '../images/404poke.png'
import error2 from '../images/404poke2.png'
import s from '../Styles/Error404.module.css'
import { Link } from 'react-router-dom'

const Error404 = () => {

    return (
        <div>
            <div>
                <img className={`${s.error}`} src={error} alt="error image" />
            </div>
            <div>
                <img className={`${s.errorphone}`} src={error2} alt="error image" />
            </div>
            <div>
                <Link to='/home'>
                    <button className={`${s.backButton}`}> <b>Back</b> </button>
                </Link>
            </div>

        </div>
    )
}

export default Error404