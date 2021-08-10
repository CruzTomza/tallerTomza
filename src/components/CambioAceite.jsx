import axios from 'axios';
import React, { useState, Fragment, useEffect, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import environment from '../env/environment'
import CambioALista from './CambioALista'
import Swal from 'sweetalert2';
import Error from '../pages/Error'
import TableAceite from './TableAceite'
import TableCambio from './TableCambio'

function CambioAceite({ inicioSesion, usuarioIniciado }) {
    const [trigger, setTrigger] = useState(false)
    const [modal, setModal] = useState(false);
    const [cambios, setCambios] = useState([])
    const [kilometraje, setKilometraje] = useState('')
    const [placaModal, setPlacaModal] = useState('')
    const [camionModal, setCamionModal] = useState([])
    const [error, guardarError] = useState(false)
    const [errorModal, guardarErrorModal] = useState(false)
    const [placa, setPlaca] = useState('')
    const [cambio, guardarCambios] = useState([])

    //constantes para la tabla
    const header = ['Placa', 'Marca', 'Km Actual', 'Km Final', 'Km para el Cambio', 'Ultimo Cambio']
    const headerAlerta = ['Placa', 'Km Actual', 'Km para el Cambio']

    const [triggerPlaca, setTriggerPlaca] = useState(false)

    const idCamion = useRef('')
    const rutaRef = useRef('')

    const referenciaRuta = rutaRef.current.value;

    const apiProd = environment.url

    const handlerButtonAgregar = () => {
        setModal(!modal)
        setModal(true)
        setCamionModal([])
    }

    const handlerButtonIngresar = () => {
        setModal(!modal)

        console.log("CAAAAMION", camionModal);

        idCamion.current = parseInt(camionModal[0].id)
        console.log("ID CAMION", idCamion.current)

        console.log('Kilometraje Inicial', camionModal[0].kmInicial);

        const limite = (parseInt(camionModal[0].kmInicial) + 11000)
        console.log('LIMITE', limite);

        const sumado = (parseInt(camionModal[0].kmTotal) + parseInt(kilometraje))
        console.log('SUMADO', sumado);


        if (sumado < limite) {

            const objCamion = {
                kmTotal: sumado,
                cambio: 0
            }
            console.log('No necesita cambio');
            const EditarCamion = async () => {
                const resultado = await axios.patch(`${apiProd}camions/${idCamion.current}`, objCamion)
                if (resultado.status === 200) {
                    Swal.fire(
                        'Reporte Agregado',
                        'Se ha agregado Correctamente',
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Vuelve a Intentarlo'
                    })
                }
            }
            EditarCamion()
        } else {
            const objCamion = {
                kmInicial: sumado,
                kmTotal: sumado,
                cambio: 1
            }
            console.log('Necesita cambio')
            const EditarCamion = async () => {
                const resultado = await axios.patch(`${apiProd}camions/${idCamion.current}`, objCamion)
                if (resultado.status === 200) {
                    Swal.fire(
                        'Reporte Agregado',
                        'Se ha agregado Correctamente',
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Vuelve a Intentarlo'
                    })
                }
            }
            EditarCamion()
        }
    }

    const recarga = e => {
        e.preventDefault();
        if (placa !== '') {
            setTriggerPlaca(true)
        } else {
            setTrigger(true)
        }
        console.log("RECARGA", e, 'placa', placa);
    }

    const props1 = []
    const {
        className
    } = props1;

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (trigger) {
            const queryCambios = async () => {
                const response = await axios.get(`${apiProd}camions/?filter[order]=tc%20DESC`)
                setCambios(response.data)
            }
            queryCambios();
            setTrigger(false)

        }
    }, [trigger, apiProd])

    if (triggerPlaca) {
        const consultaPlaca = async () => {
            const response = await axios.get(`${apiProd}camions?filter[where][placa]=${placa}`)
            setCambios(response.data)
            setTriggerPlaca(false)
            console.log(response.data);
        }
        consultaPlaca()
    }

    return (
        <Fragment>
            <div class="col-md-8 mx-auto">
                <h1 className="mt-4 text-center">Cambio de Aceite</h1>
                {(error) ? <Error mensaje='Campo placa es obligatorio' /> : null}
                <form className="mt-2 mb-2" onSubmit={recarga}>
                    <div className="form-group w-10 ml-3">
                        <input type="text" className="form-control" name="placa" placeholder="Placa" onChange={e => setPlaca(e.target.value)} />
                    </div>
                    <input type="submit" className="btn btn-primary ml-3 mr-2 mt-2" value="Consultar Cambio" />

                    {(cambios.length === 0) ?
                        <div className="alert alert-dismissible alert-light mt-3">
                            <h4 className="alert-heading text-center">No hay Datos</h4>
                            <p className="mb-0 text-center">Consulte los datos Primero</p>
                        </div>
                        :
                        <div className="disenoTablas">
                            <div className="tablaConsulta">
                                <h3 className="mt-4 text-center">Tabla Consulta</h3>
                                <TableAceite headers={header} props={cambios} />
                            </div>
                            <div className="tablaCambio">
                                <h3 className="mt-4 text-center">Tabla Cambio</h3>
                                <TableCambio headers={headerAlerta} props={cambios} />
                            </div>
                        </div>
                    }

                </form>
            </div>
        </Fragment >
    )
}

export default CambioAceite
