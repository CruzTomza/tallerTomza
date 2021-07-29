import React, { useState, useEffect } from 'react'
import axios from 'axios';
import environment from '../env/environment'
import Error from '../pages/Error'

function RTV({ inicioSesion, usuarioIniciado }) {
    const [trigger, setTrigger] = useState(false)
    const [camiones, guardarCamiones] = useState([])
    const [error, guardarError] = useState(false)
    const [rtv, setRtv] = useState('')


    const apiProd = environment.url

    const recarga = e => {
        e.preventDefault();
        setTrigger(true);
        if (rtv === '') {
            guardarError(true)
            console.log(guardarError)
            return;
        }
        guardarError(false);
    }

    useEffect(() => {
        if (trigger) {
            console.log("PASA")
            const consultaCamion = async () => {
                const response = await axios.get(`${apiProd}camions?filter[where][rtv]=${rtv}`);
                guardarCamiones(response.data)
                console.log("CAMIONES", response.data)
            }
            consultaCamion()
            setTrigger(false)
        }
    }, [trigger, apiProd])
    console.log("CAMIONES", camiones)

    return (
        <div className="col-md-8 mt-4 text-center mx-auto">
            <h1>Revisión Técnica Vehicular</h1>

            {(error) ? <Error mensaje='Campo placa es obligatorio' /> : null}
            <form className="mt-2 mb-2" onSubmit={recarga}>
                <label className="ml-3">Rtv:</label>
                <div className="form-row">
                    <div className="form-group w-10 ml-3">
                        <select className="custom-select" onChange={e => setRtv(e.target.value)}>
                            <option disabled selected="">Consultar...</option>
                            <option value="Enero y Julio">Enero y Julio</option>
                            <option value="Febrero y Agosto">Febrero y Agosto</option>
                            <option value="Marzo y Setiembre">Marzo y Setiembre</option>
                            <option value="Mayo y Noviembre">Mayo y Noviembre</option>
                            <option value="Abril y Octubre">Abril y Octubre</option>

                        </select>
                    </div>
                </div>

                <input type="submit" className="btn btn-primary ml-3 mr-2 mt-2" value="Consultar Mantenimieto" />
            </form>

            {(camiones.length === 0) ?
                <div className="alert alert-dismissible alert-light mt-3">
                    <h4 className="alert-heading text-center" >No Hay Datos</h4>
                    <p className="mb-0 text-center">Consulte los datos Primero</p>
                </div>
                :
                <div>
                    <ul className="list-group mt-3">

                    </ul>
                    <ul className="list-group mt-3">

                    </ul>
                </div>
            }
        </div>
    )
}
export default RTV