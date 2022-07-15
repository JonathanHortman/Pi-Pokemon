import React from 'react'
import s from '../Styles/Paginado.module.css'

const Paginado = ({ pokemonsPerPage, allPokemons, paginado, currentPage }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className={`${s.pagConteiner}`}>
            <ul className={`${s.compUl}`}>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number} className={`${s.number}`} >
                                <button className={`${s.numero}`} style={ currentPage === number ? {backgroundColor:"black", color:"white", border:"white"} : {}} onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Paginado