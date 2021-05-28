import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useFormik } from 'formik'

import { RiSearch2Line, RiEarthFill, RiEarthLine } from "react-icons/ri";
import { BsFillBarChartFill, BsExclamationOctagon } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

import Card from './Card'
import CardTeam from './CardTeam'
import LogOut from './LogOut'

const TOKEN = process.env.REACT_APP_TOKEN

export default function Home() {

    //------------------------------------------------USE-STATE,USE-EFFECT-------------------------------//

    const [equipo, setEquipo] = useState([])
    const [results, setResults] = useState([])
    const [useSearch, setUsedSearch] = useState(false)
    const [totalStats, setTotalStats] = useState({})
    const [heroeG, setHeroeG] = useState(0)
    const [heroeB, setHeroeB] = useState(0)

    useEffect(() => {
        if (localStorage.getItem('mi-equipo')) {
            let miEquipo = localStorage.getItem('mi-equipo')
            miEquipo = JSON.parse(miEquipo)
            setEquipo(miEquipo)

            let heroeBR = localStorage.getItem('heroeB')
            heroeBR = JSON.parse(heroeBR)
            setHeroeB(heroeBR)
            let heroeGR = localStorage.getItem('heroeG')
            heroeGR = JSON.parse(heroeGR)
            setHeroeG(heroeGR)
        }
        if (localStorage.getItem('total-stats')) {
            let total = localStorage.getItem('total-stats')
            total = JSON.parse(total)
            setTotalStats(total)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('mi-equipo', JSON.stringify(equipo))
        localStorage.setItem('total-stats', JSON.stringify(totalStats))
        localStorage.setItem('heroeB', JSON.stringify(heroeB))
        localStorage.setItem('heroeG', JSON.stringify(heroeG))
    })

    //------------------------------------------------FORMIK-----------------------------------------------//

    const validate = values => {
        const errors = {}

        if (!values.inputHero) {
            errors.inputHero = 'Por favor ingrese un nombre de héroe'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            inputHero: ''
        },
        validate,
        onSubmit: values => {
            axios.get(`/${TOKEN}/search/${values.inputHero}`)
                .then(res => {
                    const { results = [] } = res.data
                    setResults(results)
                    setUsedSearch(true)
                })
                .catch(err => {
                    alert('Error del servidor')
                    console.log(err)
                })
        }
    })

    //------------------------------------------------RESULTS-----------------------------------------------//

    function renderResults() {

        return results.length === 0
            ? <div className="div-noResults">
                <BsExclamationOctagon className="no-results-icon" />
                <div className="noResults-p">
                    <p>Ups! Parece que no se han encontrado resultados.</p>
                    <p>Intente de nuevo o pruebe con otro héroe.</p>
                </div>
            </div>
            : results.map((hero, i) => {
                if (i < 4) {
                    return <Card
                        key={hero.id}
                        id={hero.id}
                        name={hero.name}
                        image={hero.image.url}
                        power={hero.powerstats}
                        equipo={equipo}
                        orientacion={hero.biography.alignment}
                        addHeroeG={() => addHeroeG(hero)}
                        addHeroeB={() => addHeroeB(hero)} />
                }
            })
    }

    //----------------------------------------------- AÑADIR HEROE------------------------------------------//

    function addHeroeG(hero) {
        if (heroeG === 3) {
            alert('Maximo de heroes con orientacion BUENA alcanzado')
        } else {
            const cantHeroG = heroeG + 1
            setHeroeG(cantHeroG)
            addHeroe(hero)
        }
    }

    function addHeroeB(hero) {
        if (heroeB === 3) {
            alert('Maximo de heroes con orientacion MALA alcanzado')
        } else {
            const cantHeroB = heroeB + 1
            setHeroeB(cantHeroB)
            addHeroe(hero)
        }
    }

    function addHeroe(hero) {
        countStats(hero.powerstats)
        const newEquipo = hero
        setEquipo([...equipo, newEquipo]);
    }


    //----------------------------------------------- ELIMINAR HEROE------------------------------------------//

    function deleteHeroG(hero) {
        const cantHeroG = heroeG - 1
        setHeroeG(cantHeroG)
        deleteHero(hero)
    }

    function deleteHeroB(hero) {
        const cantHeroB = heroeB - 1
        setHeroeB(cantHeroB)
        deleteHero(hero)
    }

    function deleteHero(hero) {
        const id = hero.id
        updateStats(hero.powerstats)
        const newEquipo = equipo.filter(hero => hero.id !== id);
        setEquipo(newEquipo);
    }

    //------------------------------------------------STATS-----------------------------------------------//

    function updateStats(powers) {
        const newCombat = parseInt(totalStats.combat) - parseInt(powers.combat)
        const newDurability = parseInt(totalStats.durability) - parseInt(powers.durability)
        const newIntelligence = parseInt(totalStats.intelligence) - parseInt(powers.intelligence)
        const newPower = parseInt(totalStats.power) - parseInt(powers.power)
        const newSpeed = parseInt(totalStats.speed) - parseInt(powers.speed)
        const newStrength = parseInt(totalStats.strength) - parseInt(powers.strength)
        const newStats = {
            combat: newCombat.toString(),
            durability: newDurability.toString(),
            intelligence: newIntelligence.toString(),
            power: newPower.toString(),
            speed: newSpeed.toString(),
            strength: newStrength.toString()
        }
        setTotalStats(newStats)
    }

    function countStats(powers) {
        if (Object.keys(totalStats).length === 0) {
            setTotalStats(powers)
        }
        else {
            const newCombat = parseInt(totalStats.combat) + parseInt(powers.combat)
            const newDurability = parseInt(totalStats.durability) + parseInt(powers.durability)
            const newIntelligence = parseInt(totalStats.intelligence) + parseInt(powers.intelligence)
            const newPower = parseInt(totalStats.power) + parseInt(powers.power)
            const newSpeed = parseInt(totalStats.speed) + parseInt(powers.speed)
            const newStrength = parseInt(totalStats.strength) + parseInt(powers.strength)
            const newStats = {
                combat: newCombat.toString(),
                durability: newDurability.toString(),
                intelligence: newIntelligence.toString(),
                power: newPower.toString(),
                speed: newSpeed.toString(),
                strength: newStrength.toString()
            }
            setTotalStats(newStats)
        }
    }

    function maxStats(totalStats) {
        let max = 0
        const maxPower = Object.entries(totalStats).filter((entry, i) => {
            if (parseInt(entry[1]) > max) {
                max = parseInt(entry[1])
                return entry
            }
        })
        const res = maxPower.find(power => parseInt(power[1]) === max)
        return res[0]
    }

    //------------------------------------------------PROM-----------------------------------------------//

    let alt = 0
    let peso = 0

    function prom(equipo) {
        let pesoTotal = 0
        let altTotal = 0
        const separador = " "
        const promedioPeso = equipo.map((hero) => {
            const peso = hero.appearance.weight[1].split(separador)[0]
            pesoTotal = pesoTotal + parseInt(peso)
            return pesoTotal
        })
        const promedioAlt = equipo.map((hero) => {
            const alt = hero.appearance.height[1].split(separador)[0]
            altTotal = altTotal + parseInt(alt)
            return altTotal
        })
        const resPeso = Math.trunc(promedioPeso.find(peso => peso === pesoTotal) / equipo.length)
        const resAlt = Math.trunc(promedioAlt.find(alt => alt === altTotal) / equipo.length)
        const promedios = [resPeso.toString(), resAlt.toString()]
        alt = promedios[1]
        peso = promedios[0]
    }

    //------------------------------------------------EQUIPO-----------------------------------------------//

    function renderTeam() {
        prom(equipo)
        return equipo.map((hero) => {
            return <CardTeam
                key={hero.id}
                id={hero.id}
                name={hero.name}
                image={hero.image.url}
                orientacion={hero.biography.alignment}
                power={hero.powerstats}
                deleteG={() => deleteHeroG(hero)}
                deleteB={() => deleteHeroB(hero)}
            />
        })

    }

    //------------------------------------------------RETURN-----------------------------------------------//

    return (
        <div className="div-home">
            <div className="equipo-div">
                <div className="tuEquipo-div">
                    <LogOut />
                    <h1>Tu equipo <HiUserGroup /></h1>
                    {equipo.length === 0
                        ? <p>Aún no tienes héroes en tu equipo</p>
                        : <div>{renderTeam()}</div>}
                </div>
                <div className="stats-div">
                    <h1>Estadísticas de tu equipo<BsFillBarChartFill /></h1>
                    {equipo.length === 0
                        ? <p>Aún no tienes héroes en tu equipo</p>
                        : <div className="div-power total">
                            <div className="div-max">
                                <label>Equipo orientado a </label>
                                <label className="label-maxStats">{maxStats(totalStats)}</label>
                            </div>
                            <div className="div-powers">
                                <div className="div-power-label">
                                    <label className="label-stats l-total">Total Combat</label>
                                    <label className="label-num">{totalStats.combat}</label>
                                </div>
                                <div className="div-power-label">
                                    <label className="label-stats l-total">Total Durability</label>
                                    <label className="label-num">{totalStats.durability}</label>
                                </div>
                                <div className="div-power-label">
                                    <label className="label-stats l-total">Total Intelligence</label>
                                    <label className="label-num">{totalStats.intelligence}</label>
                                </div>
                                <div className="div-power-label">
                                    <label className="label-stats l-total">Total Power</label>
                                    <label className="label-num">{totalStats.power}</label>
                                </div>
                                <div className="div-power-label">
                                    <label className="label-stats  l-total">Total Speed</label>
                                    <label className="label-num">{totalStats.speed}</label>
                                </div>
                                <div className="div-power-label">
                                    <label className="label-stats l-total">Total Strength</label>
                                    <label className="label-num">{totalStats.strength}</label>
                                </div>
                            </div>
                            <div className="div-proms">
                                <label>Peso prom.</label>
                                <label>{peso} Kg</label>
                                <label>Altura prom.</label>
                                <label>{alt} Cm</label>
                            </div>
                        </div>}
                </div>
            </div>
            <div className="div-Search">
                <RiEarthFill className="ico-class ico-search" />
                <div className="div-search1">
                    <h1>Buscador de héroes</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-search-div">
                            <input
                                name="inputHero"
                                placeholder="Buscador"
                                onChange={formik.handleChange}
                                value={formik.values.inputHero}></input>
                            <button className="btn-primary but-ico but-search" type="submit">
                                <RiSearch2Line className="ico-class" />Buscar
                            </button>
                        </div>
                        {formik.errors.inputHero
                            ? <div className="div-for-err-se">{formik.errors.inputHero}</div>
                            : null
                        }
                    </form>
                </div>
                <RiEarthLine className="ico-class ico-search" />
            </div>
            <div className="div-results">
                {useSearch === false
                    ? <p>Utiliza el buscador para encontrar a tus héroes</p>
                    : renderResults()}
            </div>
        </div>
    )
}
