import axios from 'axios';
import React, { Fragment, useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import environment from '../env/environment'
import Swal from 'sweetalert2';


function CambioALista ({cam, inicioSesion, usuarioIniciado}) {

    const [modal, setModal] = useState(false);
    const [codigo, setCodigo] = useState(0)
    const [camion, setCamion] = useState([])
    const [trigger, setTrigger] = useState(false)


    const idCamion = useRef('')

    const apiProd = environment.url

    const props1 = []
    const {
        className
    } = props1;

    const toggle = () => setModal(!modal);


    const maximo = (parseInt(cam.kmInicial) + 11000)
    console.log("MAXIMO", maximo);
    const act = parseInt(cam.kmTotal)
    console.log("ACTUAL", act);

    const porceKM = (act / maximo) * 100 ;
    console.log('PORCENTAJE', porceKM);

    const handleDarSalida = () => {
        setTrigger(true)
        setModal(true)
    }

    const handlerButtonValidar = obj => {
        let code = '202106';

        console.log("TRIGEER", trigger);
        if(trigger){
            idCamion.current = parseInt(obj.target.value)
            const queryCamion = async () => {
            const resultado = await axios.get(`${apiProd}camions?filter[where][id]=${idCamion.current}`)
            setCamion(resultado.data)
        }
        queryCamion()
        setTrigger(false)
    }
                
        if(code === codigo){
            setTrigger(true)

        idCamion.current = parseInt(obj.target.value)
        console.log("ID CAMION", idCamion.current);

        const url = `${apiProd}camions/${idCamion.current}`;

        // const objCambio = {
        //             placa: camion[0].placa,
        //             fecha: Date.now(),
        //             kmInicial: camion[0].kmInicial,
        //             kmFinal: camion[0].kmTotal
        // }

        const objCamion = {
            cambio: 0
        }
        if(camion.length !== 0){
        const EditarCambCamion = async () => {
            const resultado = await axios.patch(url, objCamion)
            if(resultado.status === 200){
                Swal.fire(
                    'Salida de Taller',
                    'Se ha dado la salida Correctamente',
                    'success'
                )
                const cambioAceite = await axios.post(`${apiProd}cambioAceites`, {
                    placa: camion[0].placa,
                    fecha: Date.now(),
                    kmInicial: camion[0].kmInicial,
                    kmFinal: camion[0].kmTotal
                })
                
                if(cambioAceite.status === 200){
                        console.log('se ha agregado cambio');
                    }
            }
        }
        EditarCambCamion()
        setModal(false)
        setCamion([])
        }else{
            console.log("malo");
            Swal.fire({
                icon: 'Codigo Incorrecto',
                title: 'Error',
                text: 'Vuelve a Intentarlo'
            })
            
        }

    }        
    }

    return (
        <Fragment>
        <li className="list-group-item d-flex justify-content-between align-item-center" >
            <p>
                <span className="font-weight-bold text-info">Placa: {cam.placa}{' '}</span><br></br>
                <span className="font-weight-bold">  Cedi: {cam.unidad_negocio}</span><br></br>
                <span className="font-weight-bold">  Ruta: {cam.ruta}</span><br></br>
                <span className="font-weight-bold">  Marca: {cam.marca}</span><br></br>
                <span className="font-weight-bold">  Kilometraje: {cam.kmTotal} km</span><br></br>
                <span className="font-weight-bold">  Próximo Cambio: {maximo} km</span>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"
                        aria-valuenow={act} aria-valuemin="0" aria-valuemax={maximo} Style={60}></div>
                </div>
                
            </p>
            <div>
                {(inicioSesion && (usuarioIniciado.rol==='Admin' || usuarioIniciado.rol === 'Taller'))?
                <Button color="success"  onClick={handleDarSalida}>Dar Salida</Button>
                : null}
                </div> 
                <Modal
                                                        isOpen={modal}
                                                        toggle={toggle}
                                                        className={className}
                                                        aria-labelledby="contained-modal-title-vcenter"
                                                        centered>
                                                        <ModalHeader toggle={toggle}>Ingrese Código</ModalHeader>
                                                        <ModalBody>
                                                            <div className="form-group w-50">
                                                                <h6>Código:</h6>
                                                                <input
                                                                    type="password"
                                                                    className="form-control mt-3  mr-3 mb-1"
                                                                    onChange={e => setCodigo(e.target.value)}/>
                                                            </div>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" value={cam.id} onClick={handlerButtonValidar}>Validar</Button>{' '}
                                                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                                                        </ModalFooter>
                                                    </Modal>                      
        </li>
        </Fragment>
    )
}

export default CambioALista
