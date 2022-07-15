import React from 'react'
import { Link } from 'react-router-dom'
import s from '../Styles/Card.module.css'

const Card = (props) => {

    return (
      <div className={`${s.conteiner}`}>
        <div className={`${s.card}`}>
          <Link className={`${s.link}`} to={`/home/pokemon/${props.id}`}>
            <h3 className={`${s.name}`}>{props.name}</h3>
            <img className={`${s.image}`} src={props.image} alt="imagen" />
          </Link>
          <h4>
            {
              props.type && props.type.map(t => (
                <div className={`${s.type}`}>
                  <p className={s[t]} ></p>
                </div>
              ))
            }
          </h4>
        </div>
      </div>
    )
}

export default Card