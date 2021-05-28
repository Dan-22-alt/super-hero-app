import React, { useState, useEffect } from 'react'
import ButtonAdd from './ButtonAdd'

import { MdPerson } from "react-icons/md";
import { BsConeStriped } from "react-icons/bs";

export default function Card(props) {

    //-------------------------------------------USE-STATE,USE-EFFECT--------------------------------------//

    const [added, setAdded] = useState(false)

    useEffect(() => {
        isAdded(props.id)
    })

    //---------------------------------------------------FUNCIONES-----------------------------------------//

    function isAdded(id) {
        const existId = props.equipo.find(hero => hero.id === id)
        if (existId !== undefined) {
            setAdded(true)
        }
        else {
            setAdded(false)
        }
    }

    function renderBtton() {
        return props.equipo.length === 6
            ? <label className="btn btn-warning but-ico">Máximo alcanzado<BsConeStriped /></label>
            : <ButtonAdd
                orientacion={props.orientacion}
                addHeroeB={props.addHeroeB}
                addHeroeG={props.addHeroeG}
                power={props.power} />
    }

    //---------------------------------------------------RETURN-------------------------------------------//

    return (
        <div className="card">
            <img className="card-img-top" src={props.image} alt={props.name} />
            <div className="card-body card-search">
                <h5 className="card-title">{props.name}</h5>
                {added === true
                    ? <label className="btn btn-dark but-ico">
                        <MdPerson className="ico-class" />
                        Añadido
                    </label>
                    : renderBtton()
                }
            </div>
        </div>
    )
}