import React, { useEffect, useState } from 'react'

import { MdPersonAdd } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";

export default function ButtonAdd(props) {

    //---------------------------------------------USE-STATE,USE-EFFECT------------------------------------//

    const [count, setCount] = useState(0)

    useEffect(() => {
        countPower(props.power)
    }, [])

    //---------------------------------------------------FUNCIONES-----------------------------------------//

    function countPower(power) {
        let totalCount = 0
        Object.entries(power).map((entry) => {
            totalCount = totalCount + parseInt(entry[1])
        })
        setCount(totalCount)
    }

    function renderButton(ori) {
        if (ori === "good") {
            return <button className='btn btn-success but-ico' onClick={() => props.addHeroeG()}>
                <MdPersonAdd className="ico-class" />Añadir al equipo
            </button>
        } else {
            return <button className='btn btn-danger but-ico' onClick={() => props.addHeroeB()}>
                <MdPersonAdd className="ico-class" />Añadir al equipo
            </button>
        }
    }

    //---------------------------------------------------RETURN-------------------------------------------//

    return (
        <div>
            { isNaN(count)
                ? <label className="btn btn-dark but-ico"><BsExclamationTriangle className="ico-class" />
                    No disponible<BsExclamationTriangle className="ico-class" />
                </label>
                : renderButton(props.orientacion)
            }
        </div>

    )
}