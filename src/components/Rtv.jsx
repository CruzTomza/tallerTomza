import React, { useState, useEffect } from 'react'
import axios from 'axios';
import environment from '../env/environment'
import Error from '../pages/Error'
import ReactModal from 'react-modal';
import Swal from 'sweetalert2'

function RTV({ inicioSesion, usuarioIniciado }) {
    const [triggerRTV, setTriggerRTV] = useState(false)
    const [triggerPlaca, setTriggerPlaca] = useState(false)
    const [camiones, guardarCamiones] = useState([])
    const [error, guardarError] = useState(false)
    const [rtv, setRtv] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [placaAct, setPlacaAct] = useState('')
    const [rtvAct, setRtvAct] = useState('')
    const [triggerAct, setTriggerAct] = useState('')
    const [placa, setPlaca] = useState('')

    const apiProd = environment.url

    const recarga = e => {
        e.preventDefault();
        if (rtv !== '') {
            setTriggerRTV(true)
        }
        if (placa !== '') {
            setTriggerPlaca(true)
        }
        if (rtv === '' && placa === '') {
            guardarError(true)
            console.log(guardarError)
            return;
        }
        guardarError(false);
    }

    useEffect(() => {

        if (triggerRTV) {
            const consultaCamion = async () => {
                const response = await axios.get(`${apiProd}camions?filter[where][rtv]=${rtv}`);
                guardarCamiones(response.data)
                console.log("CAMIONES", response.data)
            }
            consultaCamion()
            setTriggerRTV(false)
        }
        if (triggerPlaca) {
            const consultaCamion = async () => {
                const response = await axios.get(`${apiProd}camions?filter[where][placa]=${placa}`);
                guardarCamiones(response.data)
                console.log("CAMIONES", response.data)
            }
            consultaCamion()
            setTriggerRTV(false)
        }
    }, [triggerRTV, triggerPlaca, apiProd, rtv, placa])

    useEffect(() => {
        var objToSend = {
            rtv: rtvAct
        }
        if (triggerAct) {
            var id = ''
            const getID = async () => {
                const response = await axios.get(`${apiProd}camions/findOne?filter[where][placa]=${placaAct}`);
                id = response.data.id
                const actRTV = async () => {
                    console.log(objToSend, id);
                    const response = await axios.patch(`${apiProd}camions/${id}`, objToSend)
                    console.log('actRTV', response.status);
                }
                actRTV()
            }

            getID()

            setTriggerAct(false)
        }
    })

    const submit = () => {
        setTriggerAct(true)
    }

    return (
        <div className="col-md-8 mt-4 text-center mx-auto">
            <h1 className='pb-4'>Revisión Técnica Vehicular</h1>

            {(error) ? <Error mensaje='Campo placa es obligatorio' /> : null}
            <form className="mt-2 mb-2" onSubmit={recarga}>
                <div className="form-row btn-align">
                    <div className="form-group d-inline-flex">
                        <div className='text-start'>
                            <select className="custom-select" onChange={e => setRtv(e.target.value)}>
                                <option disabled selected>Mes</option>
                                <option value="Enero y Julio">Enero y Julio</option>
                                <option value="Febrero y Agosto">Febrero y Agosto</option>
                                <option value="Marzo y Setiembre">Marzo y Setiembre</option>
                                <option value="Abril y Octubre">Abril y Octubre</option>
                                <option value="Mayo y Noviembre">Mayo y Noviembre</option>
                                <option value="Junio y Diciembre">Junio y Diciembre</option>
                            </select>
                        </div>
                        <div className='text-start ml-3'>
                            <input type='text' className='form-control' placeholder='Placa' onChange={e => setPlaca(e.target.value)}></input>
                        </div>
                        <input type="submit" className="btn btn-primary ml-3 d-inline-flex" value="Consultar RTV" />
                    </div>
                    <button type='button' onClick={() => setShowModal(true)} className="btn btn-secondary h-75 ml-3">Actualizar RTV</button>
                    <ReactModal
                        isOpen={showModal}
                        contentLabel="Minimal Modal Example"
                        className="Modal"
                        overlayClassName="Overlay"
                        ariaHideApp={false}
                    >
                        <section className='section-margins'>
                            <h1 className='text-center mt-4'>Actualización de RTV</h1>
                            <form onSubmit={() => submit}>
                                <div className='form-row mt-4'>
                                    <div className='form-group d-inline-flex'>
                                        <div>
                                            <label>Digite la placa:</label>
                                            <input type='text' className="form-control" name="placa" placeholder="Placa" onChange={e => setPlacaAct(e.target.value)}></input>
                                        </div>
                                        <div className='ml-3'>
                                            <label >Seleccione el Mes de RTV:</label>
                                            <select className='custom-select' onChange={e => setRtvAct(e.target.value)}>
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
                </div>
            </form>

            {(camiones.length === 0 || camiones[0].placa === '') ?
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