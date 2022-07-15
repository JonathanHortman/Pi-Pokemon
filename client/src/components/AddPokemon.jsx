
import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postPokemon } from '../actions'
import s from '../Styles/AddPokemon.module.css'
import imagen from '../images/column.png'
import create from '../images/create.png'
import home from '../images/home.png'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


const AddPokemon = () => {

  const types = useSelector((state) => state.types)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: '',
    hp: '',
    image: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: []
  })

  function onInputChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function onSelectChange(e) {
    e.preventDefault()
    if (input.types.length >= 3) {
      Swal.fire({
        icon: 'error',
        title: 'limit: 3 types',
        text: 'That could be too dangerous'
      })
    }
    else if (input.types.length < 3) {
      setInput({
        ...input,
        types: [...input.types, e.target.value]
      })

    }
  }

  let history = useHistory()


  function onSubmitHandle(e) {
    e.preventDefault()

    if (!/^[a-zA-Z\s]*$/.test(input.name)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Characters in name are not allowed'
      })
    }

    else if (input.hp.length === 0 ||
      input.attack.length === 0 ||
      input.defense.length === 0 ||
      input.speed.length === 0 ||
      input.height.length === 0 ||
      input.weight.length === 0 ||
      input.types.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please, fill out the blanks'
      })
    }

    else if (input.hp < 10 ||
      input.attack < 10 ||
      input.defense < 10 ||
      input.speed < 10 ||
      input.height < 10 ||
      input.weight < 10 ||
      input.hp > 400 ||
      input.attack > 400 ||
      input.defense > 400 ||
      input.speed > 400 ||
      input.height > 400 ||
      input.weight > 400
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Only number between 10 and 400 are allowed'
      })
    }

    else if (/^[a-zA-Z\s]*$/.test(input.name) &&
      input.name.length &&
      input.hp.length &&
      input.image.length &&
      input.attack.length &&
      input.defense.length &&
      input.speed.length &&
      input.height.length &&
      input.weight.length &&
      input.types.length) {
      dispatch(postPokemon(input))
      Swal.fire(
        'Good job!',
        'successfully created!',
        'success'
      )
      setInput({
        name: '',
        hp: '',
        image: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
      })
      history.push('/home')
    }
  }



  function validate(input) {
    let errors = {};

    if (!input.name) errors.name = <b>Enter name ❌</b>;
    else if (!/^[a-zA-Z\s]*$/.test(input.name)) errors.name = <b>Characters are not allowed ❌</b>

    else if (!input.types.length) errors.types = <b>Must choose a pokemon type ❌</b>

    else if (!input.hp || input.hp < 10 || input.hp > 400) {
      if (!input.hp) errors.hp = <b>Enter hp❌</b>
      else if (input.hp < 10) errors.hp = <b>a little wind could kill your pokemon, try with 10 hp min</b>
      else if (input.hp > 400) errors.hp = <b>Wow, that pokemon is like a god, try with 400 hp max</b>
    }

    else if (!input.image) errors.image = <b>Enter image ❌</b>;
    else if (!/(http(s?)):\/\//i.test(input.image)) errors.image = <b>Enter url format❌</b>;

    else if (!input.attack || input.attack < 10 || input.attack > 400) {
      if (!input.attack) errors.attack = <b>Enter attack❌</b>
      else if (input.attack < 10) errors.attack = <b>your pokemon wouldn't kill a fly, try with 10 attack min</b>
      else if (input.attack > 400) errors.attack = <b>your pokemon could be very dangerous, try with 400 attack max</b>

    }
    else if (!input.defense || input.defense < 10 || input.defense > 400) {
      if (!input.defense) errors.defense = <b>Enter defense❌</b>
      else if (input.defense < 10) errors.defense = <b>your pokemon could catch a cold easily, try with 10 defense min</b>
      else if (input.defense > 400) errors.defense = <b>that would be harder than a wall, try with 400 defense max</b>
    }

    else if (!input.speed || input.speed < 10 || input.speed > 400) {
      if (!input.speed) errors.speed = <b>Enter speed❌</b>
      else if (input.speed < 10) errors.speed = <b>your pokemon will be late for all the battles, try with 10 speed min</b>
      else if (input.speed > 400) errors.speed = <b>your pokemon is faster than flash, try with 400 speed max</b>
    }

    else if (!input.height || input.height < 10 || input.height > 400) {
      if (!input.height) errors.height = <b>Enter height❌</b>
      else if (input.height < 10) errors.height = <b>watch where you walk, you could step on your little pokemon, try with 10 height min</b>
      else if (input.height > 400) errors.height = <b>your pokemon is taller than a building, try with 400 height max</b>
    }

    else if (!input.weight || input.weight < 10 || input.weight > 400) {
      if (!input.weight) errors.weight = <b>Enter weight❌</b>
      else if (input.weight < 10) errors.weight = <b>you should feed your pokemon better, try with 10 weight min</b>
      else if (input.weight > 400) errors.weight = <b>definitely, your pokemon will not enter in the pokeball, try with 400 weight max</b>
    }

    else errors.name = <p className={s.finishMessage}><b>Wow, your pokemon looks great !! ✔️</b></p>


    return errors
  }

  return (

    <div className={`${s.page}`}>



      <img className={`${s.profesor}`} src="https://images.wikidexcdn.net/mwuploads/wikidex/f/f8/latest/20180820010545/Profesor_Oak_LGPE.png" alt="profesor" />
      <img className={`${s.create}`} src={create} alt="create pokemon" />
      <div>
        <img className={`${s.column}`} src={imagen} alt="column" />
      </div>
      <Link to='/home'>
        <img className={`${s.homeButton}`} src={home} alt="back home" />
      </Link>


      <div className={`${s.containerForm}`} >

        <form className={`${s.contForm}`} onSubmit={(e) => onSubmitHandle(e)}>
          <div className={`${s.selectConteiner}`} >
            <select
              className={`${s.typesButton}`}
              onChange={(e) => { onSelectChange(e) }}>
              <option className={`${s.classButton}`}>TYPES</option>
              {
                types.map(t => (
                  <option className={`${s.classButton}`}
                    key={t.name}
                    value={t.name}
                    name={"types"}>
                    {t.name}
                  </option>
                ))
              }
            </select>

            {input.image || input.types.length > 0 ?
              <div className={s.exampleConteiner}>
                <div className={s.imageConteiner}>
                  {
                    input.image ?

                      <img className={s.pokeImage} src={input.image} alt="" />
                      : <img className={s.defaultImage} src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d27c11e3-d4f0-445c-b9d6-efc9db517960/d6g7lwb-34e9670f-1779-4741-9bd4-cd990ab4a8ef.png/v1/fill/w_1024,h_874,strp/question_mark_003_pokemon_question_by_the1maguswriter_d6g7lwb-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODc0IiwicGF0aCI6IlwvZlwvZDI3YzExZTMtZDRmMC00NDVjLWI5ZDYtZWZjOWRiNTE3OTYwXC9kNmc3bHdiLTM0ZTk2NzBmLTE3NzktNDc0MS05YmQ0LWNkOTkwYWI0YThlZi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.L31i1Z3PlHViKBAe6X60nWXdrhftsynj5OBIg0rVcJo' />
                  }
                </div>
                <div className={s.typesConteiner}>
                  {
                    input.types && input.types.map(t => (
                      <div className={`${s.type}`}>
                        <p className={s[t]} ></p>
                      </div>
                    ))
                  }
                </div>
              </div>
              : ''
            }
            {errors.types && (
              <p className={`${s.errorText}`}>{errors.types}</p>)}
          </div>

          <div className={`${s.inputForm}`} >
            <input className={s.inputt} onChange={(e) => onInputChange(e)}
              placeholder="name"
              name={'name'}
              type={"text"}
              value={input.name} />
            {errors.name && (
              <p className={`${s.errorText}`}>{errors.name}</p>)}
          </div>

          <br />
          <br />

          <div className={`${s.inputForm}`} >
            <input className={s.inputt} onChange={(e) => onInputChange(e)}
              placeholder="hp"
              name={'hp'}
              type={"number"}
              value={input.hp} />
            {errors.hp && (
              <p className={`${s.errorText}`}>{errors.hp}</p>)}
          </div>

          <br />
          <br />

          <div className={`${s.inputForm}`} >
            <input className={s.inputt}
              placeholder="image"
              onChange={(e) => onInputChange(e)}
              pattern='https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$'
              name={'image'} type={"text"}
              value={input.image} />
            {errors.image && (
              <p className={`${s.errorText}`}>{errors.image}</p>)}
          </div>

          <br />
          <br />

          <div className={`${s.inputForm}`} >
            <input className={s.inputt} onChange={(e) => onInputChange(e)}
              placeholder="attack"
              name={'attack'}
              type={"number"}
              value={input.attack} />
            {errors.attack && (
              <p className={`${s.errorText}`}>{errors.attack}</p>)}
          </div>

          <br />
          <br />

          <div className={`${s.inputForm}`} >
            <input className={s.inputt} onChange={(e) => onInputChange(e)}
              placeholder="defense"
              name={'defense'}
              type={"number"}
              value={input.defense} />
            {errors.defense && (
              <p className={`${s.errorText}`}>{errors.defense}</p>)}
          </div>

          <br />
          <br />

          <div className={`${s.inputForm}`} >
            <input className={s.inputt} onChange={(e) => onInputChange(e)}
              placeholder="speed"
              name={'speed'}
              type={"number"}
              value={input.speed} />
            {errors.speed && (
              <p className={`${s.errorText}`}>{errors.speed}</p>)}
          </div>

          <br />
          <br />

          <div className={`${s.inputForm}`} >
            <input className={s.inputt} onChange={(e) => onInputChange(e)}
              placeholder="height"
              name={'height'}
              type={"number"}
              value={input.height} />
            {errors.height && (
              <p className={`${s.errorText}`}>{errors.height}</p>)}
          </div>

          <br />
          <br />

          <div className={`${s.inputForm}`} >
            <input className={s.inputt}
              placeholder="weight"
              onChange={(e) => onInputChange(e)}
              name={'weight'}
              type={"number"}
              value={input.weight} />
            {errors.weight && (
              <p className={`${s.errorText}`}>{errors.weight}</p>)}
          </div>


          <div className={s.createButtonCont}>
            <button className={`${s.createButton}`} type={'submit'}><b>CREATE NOW</b></button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AddPokemon