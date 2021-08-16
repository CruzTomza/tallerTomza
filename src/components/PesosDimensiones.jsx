import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import environment from '../env/environment'
import Error from '../pages/Error'
import Popup from 'reactjs-popup';

function PesosDimensiones({  inicioSesion, usuarioIniciado}) {
    const [trigger, setTrigger] = useState(false)
    const [camiones, guardarCamiones] = useState([])
    const [error, guardarError] = useState(false)
    const [consulta, setConsulta] = useState('')

    const apiProd = environment.url
      
    const recarga = e => {
        e.preventDefault();
        setTrigger(true);
        if (consulta === '') {
            guardarError(true)
            console.log(guardarError)
            return;
        }
        guardarError(false);
    }

    useEffect(() => {
        if (trigger) {
            console.log("PASA")
            const consulta = async () => {
                const response = await axios.get(`${apiProd}camions?filter[where][consulta]=${consulta}`);
                guardarCamiones(response.data)
                console.log("CAMIONES", response.data)
            }
            consulta()
            setTrigger(false)
        }
    }, [trigger, apiProd])
    console.log("CAMIONES", camiones)

    //const 

    return (
        <div className='col-md-8 text-center mx-auto mt-4'>
            <h1 className='pb-4'>Pesos y Dimensiones</h1>
            <form className='mt-2' onSubmit={consulta}>
                <div className='form-row btn-align'>
                    <div className='d-inline-flex'>
                        <select className = 'custom-select'>
                        <option disabled selected>Seleccionar ...</option>
                        <option>Enero y Julio</option>
                        <option>Febrero y Agosto</option>
                        <option>Marzo y Septiembre</option>
                        <option>Abril y Octubre</option>
                        <option>Mayo y Noviembre</option>
                        <option>Junio y Diciembre</option>
                        </select>
                    <input type="submit" className="btn btn-primary ml-3 d-inline-flex" value="Consultar Pesos y Dimensiones" />
                    </div>
                    <Popup trigger={<button type='button' className="btn btn-secondary h-75 ml-3">Actualizar</button>}
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
                    <h4 className="alert-heading text-center" >No hay datos disponibles aún</h4>
                    <p className="mb-0 text-center">Antes debe consultar los datos</p>
                </div>
                :
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Placa</th>
                                <th>Unidad de Negocio</th>
                                <th>Pesos y Dimensiones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {camiones.map(x =>
                            <tr>
                                <td>{x.placa}</td>
                                <td>{x.unidad_negocio}</td>
                                <td>{x.PesosDimensiones}</td>
                            </tr>
                        )}
                    </tbody>
                        </table> 
        </div>
            }
        </div>
    )
    
}
export default PesosDimensiones;