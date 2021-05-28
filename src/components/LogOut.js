import React from 'react'

import { MdCancel } from "react-icons/md";

export default function LogOut() {

    //---------------------------------------------------FUNCIONES-----------------------------------------//

    function logOut() {
        localStorage.removeItem('token')
        window.location.assign('/')
    }

    //---------------------------------------------------RETURN-------------------------------------------//

    return (
        <div className="div-logout">
            <button className="btn btn-dark logout but-ico" onClick={() => logOut()}>
                <MdCancel className="ico-class" />
                Cerrar sesión
            </button>
        </div>
    )
}