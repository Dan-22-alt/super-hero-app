import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

import { FaArrowAltCircleLeft } from "react-icons/fa";

const TOKEN = process.env.REACT_APP_TOKEN

export default function Detail(props) {

    //-------------------------------------------USE-STATE,USE-EFFECT--------------------------------------//

    const [heroe, setHeroe] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const { id } = props.match.params
            axios.get(`/${TOKEN}/${id}`)
                .then(res => {
                    const hero = res.data
                    setHeroe(hero)
                })
                .catch(err => {
                    console.log(err)
                    alert('error del lado del servidor')
                })
            setInterval(() => {
                setIsLoading(false)
            }, 4000)
        } else {
            window.location.assign('/')
        }
    }, [])

    //---------------------------------------------------RETURN-------------------------------------------//

    return (
        isLoading
            ? <div className="loader"></div>
            : <div className="det-div">
                <div className="div-goback">
                    <Link to='/Home'><FaArrowAltCircleLeft className="inicio" /></Link>

                </div>

                <div className="detail-div">
                    <div className="detail-div-1">
                        <h1>{heroe.name}</h1>
                        <img src={heroe.image.url} alt={heroe.name} className="img-detail" />
                        <h3>Nombre completo</h3>
                        <h1>{Object.entries(heroe.biography).map((entry, i) => {
                            if (i === 0) {
                                return <label key={i}>{entry[1]}</label>
                            }
                        })}</h1>
                    </div>
                    <div className="detail-div-2">
                        <div className="d2 d2-alias">
                            <h3>Alias</h3>
                            <div className="div-alias">
                                {Object.entries(heroe.biography.aliases).map((entry, i) => {
                                    if (i < heroe.biography.aliases.length - 1) {
                                        return <p key={i}>{entry[1]} ,</p>
                                    } else {
                                        return <p key={i}>{entry[1]} .</p>
                                    }
                                })}
                            </div>
                        </div>
                        <div className="d2 d2-ocu">
                            <h3>Ocupación</h3>
                            <p>{heroe.work.occupation}</p>
                        </div>
                        <div className="d2 d2-app">
                            <h3>Apariencia</h3>
                            {Object.entries(heroe.appearance).map((entry, i) => {
                                if (i === 2 || i === 3 || i === 4 || i === 5) {
                                    if (i === 2 || i === 3) {
                                        return <p key={i}>{entry[0]}: {entry[1][1]}</p>
                                    }
                                    return <p key={i}>{entry[0]}: {entry[1]}</p>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
    )
}