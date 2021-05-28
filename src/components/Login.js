import React, { useEffect } from 'react'
import axios from 'axios';

import { BsBoxArrowInRight } from "react-icons/bs";

import { useFormik } from 'formik'

export default function Login() {

    //---------------------------------------------USE-STATE,USE-EFFECT------------------------------------//

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.assign('/Home')
        }
    }, [])

    //------------------------------------------------FORMIK-----------------------------------------------//

    const validate = values => {
        const errors = {}

        if (!values.email) {
            errors.email = 'El campo de Email no puede estar vacío, por favor ingrese un email'
        }

        if (!values.password) {
            errors.password = 'El campo de Password no puede estar vacío, por favor ingrese una contraseña'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            axios.post('http://challenge-react.alkemy.org', values).then(
                res => {
                    console.log(res.data.token)
                    localStorage.setItem('token', res.data.token);
                    window.location.assign('/Home')
                })
                .catch(err => {
                    alert('Datos incorrectos')
                    console.log(err)
                })
        }
    })

    //---------------------------------------------------RETURN-------------------------------------------//

    return (
        <div className="login">
            <div className="div-login">
                <div className="div-login-1">
                    <h1>Login</h1>
                    <form
                        className="form-login"
                        onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            placeholder="challenge@alkemy.org"
                            type="email"
                            value={formik.values.email} />
                        {formik.errors.email ? <div className="div-for-err">{formik.errors.email}</div> : null}
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            placeholder="react"
                            type="password"
                            value={formik.values.password} />
                        {formik.errors.password
                            ? <div className="div-for-err">{formik.errors.password}</div>
                            : null
                        }
                        <button type="submit" className="btn btn-dark but-icon">
                            Login
                            <BsBoxArrowInRight />
                        </button>
                    </form>
                </div>
                <div className="div-login-2">
                    <h1>Bienvenido!</h1>
                    <div className="div-manual">
                        <p>Hola! Este es mi Challenge React para Alkemy, si no me conoces te dejo un enlace a mí LinkedIn aquí abajo c:</p>
                        <p>A continuación te explico algunas cosas para tener en cuenta sobre como funciona esta app:</p>
                        <div className="div-lists">
                            <div className="div-list-items">
                                <ol>
                                    <li>Tendrás un máximo de 6 héroes para agregar.</li>
                                    <li>Solo puedes agregar 3 héroes con orientación buena y 3 con mala.</li>
                                    <li>Sabrás las orientaciones que tienen en todo momento gracias al sistema de colores.</li>
                                    <li>Si cierras sesión tus héroes y estadísticas se quedaran guardadas.</li>
                                </ol>
                            </div>
                            <div className="div-list-colors">
                                <ul>
                                    <li><div className="div-mini btn-success"></div>El personaje tiene orientación BUENA</li>
                                    <li><div className="div-mini btn-danger"></div>El personaje tiene orientación MALA</li>
                                    <li><div className="div-mini btn-dark"></div>No disponible(al héroe le faltan stats)</li>
                                    <li><div className="div-mini btn-warning"></div>Máximo de héroes alcanzado</li>
                                </ul>
                            </div>
                        </div>
                        <p>Todo listo? Empecemos entonces!</p>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <p>2021  |  <a href='https://www.linkedin.com/in/developer-daniel-cisneros/'>
                    Daniel Alejandro Cisneros
                                </a>  |  Challenge React Alkemy</p>
            </footer>
        </div>
    )
}
