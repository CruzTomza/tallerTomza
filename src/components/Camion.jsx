import axios from 'axios';
import React, { useState } from 'react';
import environment from '../env/environment'
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

function AgregarCamion({ history, guardarRecarga, usuarioIniciado }) {
    //states para guardar el chofer
    const [marcaCamion, guardarMarcaCamion] = useState('');
    const [placaCamion, guardarPlacaCamion] = useState('');
    const [rutaCamion, guardarRutaCamion] = useState('');
    const [unidadNegocio, guardarUnidadNegocio] = useState('');
    const [km, setKm] = useState('');
    const [tc, setTc] = useState('')

    const apiProd = environment.url


    const Camion = async e => {

        e.target.reset()
        e.preventDefault();

        // if (marcaCamion === '' || placaCamion === '' || unidadNegocio === '' || rutaCamion === '' || capacidadCamion === ''
        //     guardarError(true);
        //     return;   99901510
        // 
        // guardarError(false);
        //crear el nuevo chofer
        const camionObj = {
            marca: marcaCamion,
            ruta: rutaCamion,
            unidad_negocio: unidadNegocio,
            placa: placaCamion,
            kmInicial: km,
            tc: tc
        }

        const AgregarCamion = async() => {
            const response = await axios.post(`${apiProd}camions`, camionObj)
            if(response.status === 200){
                Swal.fire(
                    `Camion Agregado`,
                    `Se ha creado correctamente`,
                    'success'
                )
            }
        }
        AgregarCamion()
    }


    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Camion</h1>
            

            <form
                className="mt-5"
                onSubmit={Camion}
            >
                <div className="form-group">
                    <label>Marca Camion:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="marca"
                        placeholder="Marca Camion"
                        onChange={e => guardarMarcaCamion(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Placa:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="placa"
                        placeholder="Placa del Camion"
                        onChange={e => guardarPlacaCamion(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Ruta:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="ruta"
                        placeholder="Ruta"
                        onChange={e => guardarRutaCamion(e.target.value)}
                    />
                </div> 

                <div className="form-group">
                    <label>Unidad de Negocio:</label>
                    <select className="custom-select" onChange={e => guardarUnidadNegocio(e.target.value)}>
                        <option defaultValue="">Escoga la Unidad de Negocio</option>
                        <option value="Gas Tomza">Gas Tomza</option>
                        <option value="Super Gas">Super Gas</option>
                        <option value="Atlantico">Atlantico</option>
                        <option value="Zona Sur">Zona Sur</option>
                        <option value="La Cruz">La Cruz</option>
                        <option value="Centros Comerciales">Centros Comerciales</option>
                        <option value="Distribuidores">Distribuidores</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Kilometraje Actual:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="kmActual"
                        placeholder="Kilometraje"
                        onChange={e => setKm(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Transporte Carga:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="tc"
                        placeholder="TC"
                        onChange={e => setTc(e.target.value)}
                    />
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Camion" />
            </form>
        </div>
    )

}

export default withRouter(AgregarCamion)
