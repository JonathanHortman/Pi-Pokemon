import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sort, sortCreated, getPokemons, getTypes, sortTypes, sortByAttack, searchCharacters } from '../actions'
import { ASCENDENTE, DESCENDENTE, ALL, CREADOS, EXISTENTES, STRONG, WEAK } from "../constantes/sort"
import Card from '../components/Card.jsx'
import { Link } from 'react-router-dom'
import Paginado from './Paginado'
import gh from '../images/github.png'
import li from '../images/linkedin.png'
import s from '../Styles/Home.module.css'



const Home = () => {
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemons())
    }, [])

    const [name, setName] = useState('')

    function onInputChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchCharacters(name))
        setName('')
        setCurrentPage(20)
        setTimeout(() => {
            setCurrentPage(1)
        }, 1600);
    }
    ////////////////////////////////////////////////////////////////////
    const filteredPokemons = useSelector((state) => state.filteredPokemons)
    const types = useSelector((state) => state.types)

    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage //12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //0
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }




    function onSelectChange(e) {
        dispatch(sort(e.target.value))
        setCurrentPage(1)
    }

    function onSelectChangeatk(e) {
        dispatch(sortByAttack(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e) {
        dispatch(sortCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterTypes(e) {
        dispatch(sortTypes(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className={`${s.pageeee}`}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className={`${s.imgHome}`}>
                        <img className={`${s.pokeHomeImg}`} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png" alt="home" />
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-end'>
                            <li className="nav-item p-2">
                                <select className={s.selectFilter} onChange={(e) => onSelectChange(e)}>
                                    <option value=''>Initial letter</option>
                                    <option value={ASCENDENTE}>A to Z</option>
                                    <option value={DESCENDENTE}>Z to A</option>
                                </select>
                            </li>
                            <li className="nav-item p-2">
                                <select onChange={(e) => onSelectChangeatk(e)}>
                                    <option value="">Attack</option>
                                    <option value={STRONG}>Weak</option>
                                    <option value={WEAK}>Strong</option>
                                </select>
                            </li>
                            <li className="nav-item p-2">
                                <select onChange={(e) => handleFilterCreated(e)}>
                                    <option value="">Origin</option>
                                    <option value={ALL}>all pokemons</option>
                                    <option value={CREADOS}>created</option>
                                    <option value={EXISTENTES}>existing</option>
                                </select>
                            </li>
                            <li className="nav-item p-2">
                                <select onChange={e => handleFilterTypes(e)}>
                                    <option value="All types">Types</option>
                                    {
                                        types.map(type => (
                                            <option key={type.name} value={type.name}> {type.name} </option>
                                        ))
                                    }
                                </select>
                            </li>
                            <li className="nav-item p-2">
                                <div>
                                    <Link to='/home/add'>
                                        <button className={`${s.createButton}`}>CREATE YOUR OWN POKEMON</button>
                                        <button className={`${s.createButtonPhone}`}>CREATE POKE</button>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={(e) => onSubmit(e)}>
                            <input className="form-control me-2" type="text" placeholder="Search" value={name} aria-label="Search" onChange={(e) => onInputChange(e)} />
                            <button className="btn btn-outline-success" type="submit" value="search">Search</button>

                        </form>

                    </div>
                </div>
            </nav>



            <div className={`${s.paginado}`}>
                <Paginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={filteredPokemons.length}
                    paginado={paginado}
                    currentPage={currentPage}
                />
            </div>

            <div className={`${s.containerCard}`}>

                {
                    currentPokemons.length ?
                        currentPokemons.map(p => {
                            return <Card key={p.id} id={p.id} name={p.name} image={p.image} type={p.types} />
                        })

                        : <div className={`${s.loader}`}>
                            <img className={`${s.loaderPhone}`} src="https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif" alt="loading" />
                            <img className={`${s.fantasmaGif}`} src="https://i.gifer.com/5RTG.gif" alt="loading image" />
                            <img className={`${s.cargandoGif}`} src="https://i.gifer.com/YCZH.gif" alt="loading image" />
                        </div>
                }
            </div>

            <div className={s.conteiner}>

                <div className={s.lista}>

                    <p className={s.lista1}>
                        Henry - 2022 - Jonathan Hortman
                    </p>
                    <p className={s.lista1phone}>
                        Jonathan Hortman ©
                    </p>
                </div>

                <div className={s.posImagen}>
                    <img className={s.imgredes1} src={gh} alt="github logo" />

                    <img className={s.imgredes2} src={li} alt="linkedin logo" />
                </div>



            </div>

        </div>
    )
}

export default Home