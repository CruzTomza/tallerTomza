import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import environment from '../env/environment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReparacionLista from './ReparacionLista'
import Swal from 'sweetalert2';
import Error from '../pages/Error'


function CamionListaS({ camion }) {

    return (
        <option value={camion.placa} key={camion.placa}>{camion.placa} - {camion.marca} - {camion.ruta}</option>
    );
}

function Reparacion({ inicioSesion, usuarioIniciado }) {

    const [trigger, setTrigger] = useState(false)
    const [triggerA, setTriggerA] = useState(false)
    const [triggerAgregar, setTriggerAgregar] = useState(false)
    const [camiones, guardarCamiones] = useState([])
    const [cami, guardarCamion] = useState('')
    const [reporte, guardarReporte] = useState('')
    const [modal, setModal] = useState(false);
    const [ruta, guardarRuta] = useState('')
    const [fecha, guardarFecha] = useState('')
    const [placa, setPlaca] = useState('')
    const [error, guardarError] = useState(false)
    const [errorModal, guardarErrorModal] = useState(false)
    const [fecha1, setFecha1] = useState(false)
    const [reparaciones, guardarReparaciones] = useState([])

    const apiProd = environment.url

    const recarga = e => {
        e.preventDefault();
        setTrigger(true);
        setTriggerA(true);

        if (fecha === '' || placa === '') {
            guardarError(true)
            console.log(guardarError)
            return;
        }
        guardarError(false);
    }

    const props1 = []

    const {
        className
    } = props1;

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (trigger) {
            console.log("PASA")
            const consultaCamion = async () => {
                const response = await axios.get(`${apiProd}camions`);
                guardarCamiones(response.data)
                console.log("CAMIONES", response.data)
            }
            consultaCamion()
            setTrigger(false)
        }
    })

    const camionSort = camiones.sort(camiones.placa);
    console.log("Sorteado", camionSort);

    console.log("CAMIONES", camiones)

    useEffect(() => {
        if (triggerA) {
            if (fecha !== '' && placa !== '') {
                const consultaRepa = async () => {
                    const response = await axios.get(`${apiProd}reparacions?filter[where][entrada]=${fecha}&filter[where][idCamion]=${placa}`)
                    guardarReparaciones(response.data)
                    setTriggerA(false)
                }
                consultaRepa()
            } else {
                guardarError(true)
            }
        }
    })
    console.log("REPA", reparaciones)

    const handlerButtonAgregar = () => {
        setModal(!modal)
        setModal(true)
        setTrigger(true)
        setTriggerAgregar(true)
    }
    //para almacenar el cedi en la reparacion


    const handlerButtonIngresar = () => {

        setModal(false);

        if (reporte === '' || cami === '') {
            guardarErrorModal(true)
            console.log(guardarErrorModal)
            setModal(true)
            return;
        }
         guardarErrorModal(false);

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

        const cedi = usuarioIniciado.cedi

        //cuando se ingresa un reporte "aprobado" entra como False
        //0= False
        //1= True
        const repObj = {
            cedi: cedi,
            idCamion: cami,
            reporte: reporte,
            entrada: Date.now(),
            aprobado: 0,
            ruta: ruta,
            repuestos: "",
            costo: ""
        }
        console.log("OBJETO", repObj);

        if (triggerAgregar) {
            try {
                const AgregarRepa = async () => {
                    const resultado = await axios.post(`${apiProd}reparacions`, repObj);
                    if (resultado.status === 200) {
                        console.log("Agregado");
                        Swal.fire(
                            'Solicitud de Reparacion',
                            'Se ha creado correctamente',
                            'success'
                        )
                        const bita = await axios.post(`${apiProd}bitacoraTallers`, {
                            idUsuario: usuarioIniciado.id,
                            accion: `Ha ingresado una reparacion el usuario: ${usuarioIniciado.name}`,
                            fecha: Date.now()
                        });
                        if (bita.status === 200) {
                            console.log('se ha agregado a la bitacora');
                        }
                    }
                }
                AgregarRepa()
            } catch (error) {
                console.log(error);
            }
            setTriggerAgregar(false)
        }
    }

    return (

        <Fragment>
        <div className="col-md-8 mx-auto">
        <h1 className="text-center mt-4"> Reparaciones </h1>
        {(error) ? <Error mensaje='Campo, placa y fecha son obligatorios' /> : null}
        <form className="mt-2 mb-2" onSubmit={recarga}>
            <label className="ml-3">Fecha:</label>
            <div className="form-row">

                <div className="form-group w-25 ml-3">
                 <input type="date" className="form-control" name="fecha_reparacion" onChange={e => guardarFecha(e.target.value)} />
                </div>
                <div className="form-group w-10 ml-3">
                    <input type="text" className="form-control" name="placa" placeholder="Placa" onChange={e => setPlaca(e.target.value)} />
                </div>
            </div>

            <input type="submit" className="btn btn-primary ml-3 mr-2 mt-2" value="Consultar Reparación" />

            {(inicioSesion && (usuarioIniciado.rol === 'Admin' || usuarioIniciado.rol === 'Supervisor')) ?
                <Button color="info" className="mt-2" onClick={handlerButtonAgregar}>Agregar Reparación</Button>
                : null}
            <Modal
                isOpen={modal}
                toggle={toggle}
                className={className}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <ModalHeader toggle={toggle}>Reparación</ModalHeader>
                <ModalBody>
                    {(errorModal) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

                    <div className="form-group w-50">
                        <label> Camion:</label>
                        <select className="custom-select" onChange={e => guardarCamion(e.target.value)}>
                            <option value="">Camion</option>
                            {camionSort.map(camion => (
                                <CamionListaS
                                    key={camion.placa}
                                    camion={camion}
                                />))}
                        </select>
                    </div>

                    <div className="form-group w-50">
                        <h6>Ruta:</h6>
                        <input
                            type="text"
                            className="form-control mt-3  mr-3 mb-1"
                            onChange={e => guardarRuta(e.target.value)}
                        />
                    </div>

                    <div className="form-group w-50">
                        <h6>Reporte:</h6>
                        <textarea
                            type="text-area"
                            className="form-control mt-3  mr-3 mb-1"
                            onChange={e => guardarReporte(e.target.value)}
                        />
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handlerButtonIngresar}>Ingresar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            {(reparaciones.length === 0) ?
                <div className="alert alert-dismissible alert-light mt-3">
                    <h4 className="alert-heading text-center">No hay Datos</h4>
                    <p className="mb-0 text-center">Consulte los datos Primero</p>
                </div>
                :
                <ul className="list-group mt-5">
                    {reparaciones.map(repara => (
                        <ReparacionLista
                            key={repara.id}
                            repara={repara}
                            inicioSesion={inicioSesion}
                            usuarioIniciado={usuarioIniciado}
                        />
                    ))}
                </ul>}
        </form>


        </div>
        </Fragment >

    )


}

export default Reparacion;


