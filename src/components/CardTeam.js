import React from 'react'

import { Link } from 'react-router-dom'

import { MdMoreVert, MdClose } from "react-icons/md";

export default function CardTeam(props) {

    //--------------------------------------------------RETURN------------------------------------------//

    return (
        <div>
            { props.orientacion === "good"
                ? <div className="cardTeam bg-success">
                    <img className="card-img-top" src={props.image} alt={props.name} />
                    <div className="card-body team">
                        <h5 className="card-title">{props.name}</h5>
                        <div className="div-power">
                            <div className="div-power-label">
                                <label className="label-stats">Combat</label>
                                <label>{props.power.combat}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Durability</label>
                                <label>{props.power.durability}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Intelligence</label>
                                <label>{props.power.intelligence}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Power</label>
                                <label>{props.power.power}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Speed</label>
                                <label>{props.power.speed}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Strength</label>
                                <label>{props.power.strength}</label>
                            </div>
                        </div>
                        <div className="div-btn-team">
                            <Link to={`/Detail/${props.id}`}>
                                <button className="button-team-card but det btn-primary but-ico">
                                    <MdMoreVert className="ico-class" />
                                    Ver detalles
                                </button>
                            </Link>
                            <button
                                className="button-team-card but del btn-dark but-ico"
                                onClick={() => props.deleteG()}>
                                <MdClose className="ico-class" />
                                    Eliminar del equipo</button>
                        </div>
                    </div>
                </div>
                : <div className="cardTeam bg-danger">
                    <img className="card-img-top" src={props.image} alt={props.name} />
                    <div className="card-body team">
                        <h5 className="card-title">{props.name}</h5>
                        <div className="div-power">
                            <div className="div-power-label">
                                <label className="label-stats">Combat</label>
                                <label>{props.power.combat}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Durability</label>
                                <label>{props.power.durability}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Intelligence</label>
                                <label>{props.power.intelligence}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Power</label>
                                <label>{props.power.power}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Speed</label>
                                <label>{props.power.speed}</label>
                            </div>
                            <div className="div-power-label">
                                <label className="label-stats">Strength</label>
                                <label>{props.power.strength}</label>
                            </div>
                        </div>
                        <div className="div-btn-team">
                            <Link to={`/Detail/${props.id}`}>
                                <button className="button-team-card but det btn-primary but-ico">
                                    <MdMoreVert className="ico-class" />
                                Ver detalles
                            </button>
                            </Link>
                            <button
                                className="button-team-card but del btn-dark but-ico"
                                onClick={() => props.deleteB()}>
                                <MdClose className="ico-class" />
                                Eliminar del equipo
                        </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}