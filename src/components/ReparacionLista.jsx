import axios from 'axios';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import environment from '../env/environment'
import Swal from 'sweetalert2';



function ReparacionLista({ repara, inicioSesion, usuarioIniciado }) {

    const [modal, setModal] = useState(false);
    const [repuestos, setRepuestos] = useState('');
    const [costo, setCosto] = useState('');
    const [objeto, setObjeto] = useState('')
    const [trigger, setTrigger] = useState(false)
    const [reparacion, setReparacion] = useState([])
    const [fecha1, setFecha1] = useState('')


    const apiProd = environment.url

    const idReparacion = useRef('')

    const props1 = []
    const {
        className
    } = props1;

    const toggle = () => setModal(!modal);

    const handleRepuestos = () => {
        idReparacion.current = parseInt(reparacion[0].id)
        console.log("IDDDD", idReparacion.current);
        const url = `${apiProd}reparacions/${idReparacion.current}`;

        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if (month < 10) {
            console.log(`${year}-${month}-${day}`)
            setFecha1(`${year}-0${month}-${day}`)
        } else {
            console.log(`${year}-${month}-${day}`)
            setFecha1(`${year}-${month}-${day}`)
        }

        const objReporte = {
            salida: Date.now(),
            aprobado: 1,
            repuestos: repuestos,
            costo: costo
        }

        const EditarReparaciones = async () => {
            const resultado = await axios.patch(url, objReporte)
            if (resultado.status) {
                Swal.fire(
                    'Salida de Taller',
                    'Se ha dado la Salida Correctamente',
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
        EditarReparaciones()
        setModal(false)
    }

    useEffect(() => {
        if (trigger) {
            const queryRepara = async () => {
                const response = await axios.get(`${apiProd}reparacions?filter[where][id]=${objeto}`)
                setReparacion(response.data)
                console.log("PRUEBAAAAA", response.data);
            }
            setTrigger(false)
            queryRepara()
        }
    }, [setTrigger, objeto, apiProd, trigger])

    const handleDarSalida = objt => {
        setModal(true)
        setTrigger(true)
        setObjeto(objt.target.value)

    }


    return (
        <Fragment>
            <li className="list-group-item d-flex justify-content-between align-item-center" >
                <p>
                    <span className="font-weight-bold text-info"> Placa: {repara.idCamion}{' '}</span><br></br>
                    <span className="font-weight-bold">  Cedi: {repara.cedi}</span><br></br>
                    <span className="font-weight-bold">  Ruta: {repara.ruta}</span><br></br>
                    <span className="font-weight-bold">  Entrada: {repara.entrada}</span><br></br>
                    <span className="font-weight-bold">  Salida: {repara.salida}</span><br></br>
                    <span className="font-weight-bold">  Reporte: {repara.reporte}</span><br></br>
                    <span className="font-weight-bold">  Aprobado: {repara.aprobado}</span><br></br>
                    <span className="font-weight-bold">  Repuestos: {repara.repuestos}</span><br></br>
                    <span className="font-weight-bold">  Costo: {repara.costo}</span>

                </p>
                <div>
                    {(inicioSesion && (usuarioIniciado.rol === 'Admin')) ?
                        <Button color="success" value={repara.id} onClick={handleDarSalida}>Dar Salida</Button>
                        : null}
                </div>
                <Modal
                    isOpen={modal}
                    toggle={toggle}
                    className={className}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <ModalHeader toggle={toggle}>Dar Salida a Camion</ModalHeader>
                    <ModalBody>
                        <div className="form-group w-50">
                            <h6>Repuestos:</h6>
                            <textarea
                                type="number"
                                className="form-control mt-3  mr-3 mb-1"
                                onChange={e => setRepuestos(e.target.value)} />
                        </div>

                        <div className="form-group w-50">
                            <h6>Costo ₡:</h6>
                            <input
                                type="number"
                                className="form-control mt-3  mr-3 mb-1"
                                onChange={e => setCosto(e.target.value)} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleRepuestos}>Ingresar</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </li>
        </Fragment>
    )
}


export default ReparacionLista;