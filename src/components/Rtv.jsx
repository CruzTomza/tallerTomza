import React, { useState, useEffect } from 'react'
import axios from 'axios';
import environment from '../env/environment'
import Error from '../pages/Error'
import Popup from 'reactjs-popup';

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
            <h1 className='pb-4'>Revisión Técnica Vehicular</h1>

            {(error) ? <Error mensaje='Campo placa es obligatorio' /> : null}
            <form className="mt-2 mb-2" onSubmit={recarga}>
                <div className="form-row btn-align">
                    <div className="form-group d-inline-flex">
                        <select className="custom-select" onChange={e => setRtv(e.target.value)}>
                            <option disabled selected>Consultar...</option>
                            <option value="Enero y Julio">Enero y Julio</option>
                            <option value="Febrero y Agosto">Febrero y Agosto</option>
                            <option value="Marzo y Setiembre">Marzo y Setiembre</option>
                            <option value="Abril y Octubre">Abril y Octubre</option>
                            <option value="Mayo y Noviembre">Mayo y Noviembre</option>
                            <option value="Junio y Diciembre">Junio y Diciembre</option>
                        </select>
                        <input type="submit" className="btn btn-primary ml-3 d-inline-flex" value="Consultar RTV" />
                    </div>
                    <Popup trigger={<button type='button' className="btn btn-secondary h-75 ml-3">Actualizar RTV</button>}
                        modal
                        nested>
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <span> Modal content </span>
                            </div>
                        )}
                    </Popup>
                </div>
            </form>

            {(camiones.length === 0) ?
                <div className="alert alert-dismissible alert-light mt-3">
                    <h4 className="alert-heading text-center" >No Hay Datos</h4>
                    <p className="mb-0 text-center">Consulte los datos Primero</p>
                </div>
                :
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Unidad de Negocio</th>
                                <th>RTV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {camiones.map(x =>
                                <tr>
                                    <td>{x.placa}</td>
                                    <td>{x.unidad_negocio}</td>
                                    <td>{x.rtv}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}
export default RTV