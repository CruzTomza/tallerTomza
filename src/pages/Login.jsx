import React, { useState } from 'react';
import environment from "../env/environment"
import Swal from 'sweetalert2';
import Error from './Error'

import axios from 'axios';


const LoginUser = ({ guardarInicioSesion, guardarUsuarioIniciado }) => {

    // const history = useHistory;
    // const handleClick = () => history.push('/Cliente/MainMenu');

    const [error, guardarError] = useState(false)
    const [usuario, guardarUsuario] = useState('')//usuario===correo
    const [contrasena, guardarContrasena] = useState('')

    const apiProd = environment.url



    const startLogin = async e => {
        e.preventDefault();
        if (usuario === '' || contrasena === '') {
            guardarError(true)
            console.log(guardarError)
            return;
        }
        guardarError(false);


        try {
            console.log('pasa por aqui');
            const resultLogin = await axios.get(`${apiProd}usertallers/findOne?filter[where][user]=${usuario}&&[pass]=${contrasena}`);
            console.log("Consulta")
            if (resultLogin.status === 200) {
                Swal.fire(
                    'Credenciales Correctas',
                    'Se ha iniciado sesion correctamente correctamente',
                    'success'
                )
                const usuarioID = (resultLogin.data.id)
                const bita = await axios.post(`${apiProd}bitacoraTallers`, {
                    idUsuario: usuarioID,
                    accion: `Ha ingresado al sistema el usuario: ${usuario}`,
                    fecha: Date.now()
                });
                if(bita.status === 200){
                    console.log('se ha agregado a la bitacora');
                }
                guardarInicioSesion(true);
                guardarUsuarioIniciado(resultLogin.data)
                console.log("USUARIOOO", (resultLogin.data.id));
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Credenciales Incorrectas',
            })
        }
    }


    return (

        <div className="col-md-8 mx-auto ">
            <h2 className="text-center pt-4">Iniciar Sesión</h2>
            {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <form
                className="mt-5"
                onSubmit={startLogin}
            >
                <div className="form-group">
                    <label>Correo del Usuario:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="usuario"
                        placeholder="Ej: lsolano@tomza.com"
                        onChange={e => guardarUsuario(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="contrasena"
                        placeholder="Contraseña del usuario"
                        onChange={e => guardarContrasena(e.target.value)}
                    />
                </div>

                <input type="submit" className="font-weight-bold mt-5 btn btn-primary btn-block py-3" value="Iniciar Sesión" />
            </form>
        </div>

    )
}

export default LoginUser;
