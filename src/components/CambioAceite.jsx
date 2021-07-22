import axios from 'axios';
import React,{useState, Fragment, useEffect, useRef} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import environment from '../env/environment'
import CambioALista from './CambioALista'
import Swal from 'sweetalert2';
import Error from '../pages/Error'



function CambioAceite ({inicioSesion, usuarioIniciado}) {


    const [trigger, setTrigger] = useState(false)
    const [modal, setModal] = useState(false);
    const [cambios, setCambios] = useState([])
    const [kilometraje, setKilometraje] = useState('')
    const [placaModal, setPlacaModal] = useState('')
    const [camionModal, setCamionModal] = useState([])
    const [error, guardarError] = useState(false)
    const [errorModal, guardarErrorModal] = useState(false)



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

        // if (kilometraje === ''  ) {
        //     guardarErrorModal(true)
        //     console.log(guardarErrorModal)
        //     setModal(true)
        //     return;
        // }
        // guardarErrorModal(false);
        //const url = `${apiProd}camions/${idCamion.current}`;
        console.log("CAAAAMION", camionModal);

        idCamion.current = parseInt(camionModal[0].id)
        console.log("ID CAMION", idCamion.current)

        console.log('Kilometraje Inicial', camionModal[0].kmInicial);

        const limite = (parseInt(camionModal[0].kmInicial) + 11000)
        console.log('LIMITE', limite);

        const sumado = (parseInt(camionModal[0].kmTotal) + parseInt(kilometraje))
        console.log('SUMADO', sumado);
       
        
        if(sumado < limite) {
            
        const objCamion = {
            kmTotal: sumado,
            cambio: 0
        }
            console.log('No ocupa cambio');
            const EditarCamion = async () => {
                const resultado = await axios.patch(`${apiProd}camions/${idCamion.current}`, objCamion)
                    if(resultado.status === 200){
                        Swal.fire(
                            'Reporte Agregado',
                            'Se ha agregado Correctamente',
                            'success'
                        )
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Vuelve a Intentarlo'
                        })
                    }
            }
            EditarCamion()
        } else{
            const objCamion = {
                kmInicial: sumado,
                kmTotal: sumado,
                cambio: 1
            }
            console.log('Ocupa cambio')
            const EditarCamion = async () => {
                const resultado = await axios.patch(`${apiProd}camions/${idCamion.current}`, objCamion)
                    if(resultado.status === 200){
                        Swal.fire(
                            'Reporte Agregado',
                            'Se ha agregado Correctamente',
                            'success'
                        )
                    }else{
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
        setTrigger(true)
        console.log("RECARGA");

        // if (placa === '') {
        //     guardarError(true)
        //     console.log(guardarError)
        //     return;
        // }
        // guardarError(false);
    }
//     const handlerButtonCamiones = () => {
//         setTriggerCamion(true)
//     // useEffect(() => {
//         if(triggerCamion){
//             const queryCamiones = async () => {
//                 const response = await axios.get(`${apiProd}camions/?filter[where][placa]=${placa}`)
//                 setCamiones(response.data)
//             }
//             queryCamiones();
//             setTriggerCamion(false)
//             console.log("CAMIIIIIIo", camiones);
//         }
//     // })
// }
    const props1 = []
    const {
        className
    } = props1;

    const toggle = () => setModal(!modal);


    // const handlerButtonCambioAceite = () => {
    //     setTrigger(true)
    useEffect(() => {
        if(trigger){
            const queryCambios = async () => {
                const response = await axios.get(`${apiProd}camions/?filter[where][cambio]=${1}`)
                setCambios(response.data)
            }
            queryCambios();
            setTrigger(false)
        
        }
    }, [trigger, apiProd])
// }

        // const handlePlaca = async e => {
        // e.preventDefault();
        //         const queryCamion = async () => {
        //             const response = await axios.get(`${apiProd}camions/?filter[where][placa]=${placaModal}`)
        //             setCamionModal(response.data)
        //         }
        //         queryCamion()
        // }

        // <label className="ml-3">Placa:</label>
        //         <div className="form-row">
        //             <div className="form-group w-10 ml-3">
        //                 <input type="text" className="form-control" name="placa" placeholder="Placa" onChange={e => setPlaca(e.target.value)} />
        //             </div>
        //         </div>

        // <Button color="info" className="mt-2" onClick={handlerButtonAgregar}>Agregar Reporte</Button>
                //                                     <Modal
                //                                         isOpen={modal}
                //                                         toggle={toggle}
                //                                         className={className}
                //                                         aria-labelledby="contained-modal-title-vcenter"
                //                                         centered>
                //                                         <ModalHeader toggle={toggle}>Reporte Kilometraje</ModalHeader>
                //                                         <ModalBody>
                //                                         {(errorModal) ? <Error mensaje='Campo Kilometraje es Requerido' /> : null}

                //                                         <div className="form-group w-50">
                //                                                 <h6>Placa:</h6>
                //                                                 <input
                //                                                     type="text"
                //                                                     className="form-control mt-3  mr-3 mb-1"
                //                                                     onChange={e => setPlacaModal(e.target.value)}
                //                                                      />
                //                                             <Button className="btn btn-success" onClick={handlePlaca}>Cargar Camion</Button>
                //                                             </div>

                //                                             {(camionModal.length !== 0) ?
                //                                             <div className="form-group w-50">
                //                                                 <h6>Ruta:</h6>
                //                                                 <input
                //                                                     id="disabledInput"
                //                                                     type="text"
                //                                                     className="form-control mt-3  mr-3 mb-1"
                //                                                     disabled="true"
                //                                                     ref={referenciaRuta}
                //                                                     defaultValue={camionModal[0].ruta}
                //                                                      />
                //                                             </div> 
                //                                             : null}

                //                                             {(camionModal.length !== 0) ?
                //                                             <div className="form-group w-50">
                //                                                 <h6>Kilometraje:</h6>
                //                                                 <input
                //                                                     type="text"
                //                                                     className="form-control mt-3  mr-3 mb-1"
                //                                                     onChange={e => setKilometraje(e.target.value)}
                //                                                      />
                //                                             </div>
                //                                              : null}
                //                                         </ModalBody>
                //                                         <ModalFooter>
                //                                             <Button color="primary" onClick={handlerButtonIngresar}>Ingresar</Button>{' '}
                //                                                     <Button color="warning" onClick={toggle}>Cancel</Button>
                //                                         </ModalFooter>
                //                                     </Modal>   

    return (
        <Fragment>
        <div class="col-md-8 mx-auto"> 
            <h1 className="mt-4 text-center">Cambio de Aceite</h1>
            {(error) ? <Error mensaje='Campo placa es obligatorio' /> : null}
            <form className="mt-2 mb-2" onSubmit={recarga}>
                

                <input type="submit" className="btn btn-primary ml-3 mr-2 mt-2" value="Consultar Cambio" />
 
                {(cambios.length === 0) ?
                    <div className="alert alert-dismissible alert-light mt-3">
                    <h4 className="alert-heading text-center">No hay Datos</h4>
                    <p className="mb-0 text-center">Consulte los datos Primero</p>
                    </div>
                    :
                        <ul className="list-group mt-5">
                    {cambios.map(cam => (
                        <CambioALista 
                        key={cam.id}
                        cam={cam}
                        usuarioIniciado={usuarioIniciado}
                        inicioSesion={inicioSesion}
                        />
                    ))}
                    </ul>}
                    
            </form>
            </div>
        </Fragment >
    )
}

export default CambioAceite
