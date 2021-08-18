import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import environment from '../env/environment'
import Error from '../pages/Error'
import ReactModal from 'react-modal';

function PesosDimensiones({ inicioSesion, usuarioIniciado }) {
    const [trigger, setTrigger] = useState(false)
    const [camiones, guardarCamiones] = useState([])
    const [error, guardarError] = useState(false)
    const [consulta, setConsulta] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [placaAct, setPlacaAct] = useState('')
    const [consultaAct, setConsultaAct] = useState('')
    const [triggerAct, setTriggerAct] = useState('')

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

    const submit = () => {
        setTriggerAct(true)
    }

    return (
        <div className='col-md-8 text-center mx-auto mt-4'>
            <h1 className='pb-4'>Pesos y Dimensiones</h1>
            <form className='mt-2' onSubmit={consulta}>
                <div className='form-row btn-align'>
                    <div className='d-inline-flex'>
                        <select className='custom-select'>
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
                    <button type='button' onClick={() => setShowModal(true)} className="btn btn-secondary h-75 ml-3">Actualizar</button>
                </div>
            </form>
            <ReactModal
                isOpen={showModal}
                contentLabel="Minimal Modal Example"
                className="Modal"
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <section className='section-margins'>
                    <h1 className='text-center mt-4'>Actualización de Pesos y Dimensiones</h1>
                    <form onSubmit={() => submit}>
                        <div className='form-row mt-4'>
                            <div className='form-group d-inline-flex'>
                                <div>
                                    <label>Digite la placa:</label>
                                    <input type='text' className="form-control" name="placa" placeholder="Placa" onChange={e => setPlacaAct(e.target.value)}></input>
                                </div>
                                <div className='ml-3'>
                                    <label >Seleccione el mes:</label>
                                    <select className='custom-select' onChange={e => setConsultaAct(e.target.value)}>
                                        <option disabled selected>Seleccionar...</option>
                                        <option value="Enero y Julio">Enero y Julio</option>
                                        <option value="Febrero y Agosto">Febrero y Agosto</option>
                                        <option value="Marzo y Setiembre">Marzo y Setiembre</option>
                                        <option value="Abril y Octubre">Abril y Octubre</option>
                                        <option value="Mayo y Noviembre">Mayo y Noviembre</option>
                                        <option value="Junio y Diciembre">Junio y Diciembre</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end mb-4'>
                            <button type='button' className='btn btn-primary mr-2' onClick={() => submit()}>Actualizar</button>
                            <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>Cancel</button>
                        </div>

                    </form>
                </section>

            </ReactModal>

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