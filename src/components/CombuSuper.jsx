import React, { Fragment, useState, useRef, useEffect} from 'react'
import { Link } from "react-router-dom";
import environment from '../env/environment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Error from '../pages/Error'
import Swal from 'sweetalert2';
import SPLista from './SuperGasLista';

const SuperGas = ({usuarioIniciado, superG, setTriggerApp,inicioSesion}) => {

    const [trigger, setTrigger] = useState(false)
    const [error, guardarError] = useState(false)
    const [triggerBod, setTriggerBod] = useState(false)
    const [triggerCam, setTriggerCam] = useState(false)
    const [triggerGas, setTriggerGas] = useState(false)
    const [fecha, setFecha] = useState('')
    const [modal, setModal] = useState(false);
    const [modalCisterna, setModalCisterna] = useState(false);
    const [errorModal, guardarErrorModal] = useState(false)
    const [placaModal, setPlacaModal] = useState('')
    const [camionModal, setCamionModal] = useState([])
    const [marcaIni, setMarcaIni] = useState("");
    const [marcaFin, setMarcaFin] = useState("")
    const [kilometraje, setKilometraje] = useState('')
    const [gasolina, setGasolina] = useState([])
    const [tipo, setTipo] = useState('') 
    const [codigo, setCodigo] = useState(0)


    const apiProd = environment.url

    const rutaRef = useRef('')
    const referenciaRuta = rutaRef.current.value;

    const bodegaRef = useRef('')
    bodegaRef.current = parseInt(superG[0].id)


    const idCamion = useRef('')

    const recarga = e => {
        e.preventDefault();
        setTriggerGas(true)

        if (fecha === '') {
            guardarError(true)
            console.log(guardarError)
            return;
        }
        guardarError(false)
    }

    // const handleConsulta = () => {
    //     setTriggerGas(true)
    // }

    console.log('TRIGGER', triggerGas);
    useEffect(() => {
        if(triggerGas){
            console.log('TRIGGER', triggerGas);
            console.log('FECHAAA', fecha);
            const queryGas = async () => {
                const response = await axios.get(`${apiProd}descarga_gasols?filter[where][fecha]=${fecha}&filter[where][cedi]=Super Gas`)
                setGasolina(response.data)
                console.log("PUTAsal", response.data
                
                );
                console.log("Largo", gasolina.length);
            }
            queryGas()
        }
        setTriggerGas(false)

    })

    console.log("GASOLINA", gasolina);



    const toggle = () => setModal(!modal);

    const toggle1 = () => setModalCisterna(!modalCisterna);

    const handleCisterna = () => {
        setModalCisterna(true)
        setTriggerApp(true)
    }

    const handleLleno = () => {
        const codi = 202107

        console.log("Bodega", superG[0].cap_actual);

        const objLleno = {
            cap_actual: ((superG[0].cap_actual) + (3790))
        }

        const codig = parseInt(codigo)

        if(codig === codi){
            console.log("IGUaL");
            const RellenoCisterna = async () => {
                const result = await axios.patch(`${apiProd}bod_combustibles/${bodegaRef.current}`, objLleno)
                if(result.status === 200){
                    Swal.fire(
                        `Se ha recargado la Cisterna`,
                        'Se ha ingresado correctamente',
                        'success'
                    )
                    setModalCisterna(false)
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Vuelve a Intentarlo'
                    })
                }
            }
            RellenoCisterna()
            setTriggerApp(true)

        }

        console.log("OBJETO", objLleno);
    }

    const handlerButtonAgregar = () => {
        setModal(!modal)
        setCamionModal([])
        setMarcaIni("")
        setMarcaFin("")
        setKilometraje("")
        guardarErrorModal(false);
        setTrigger(true)
        setTriggerBod(true)
        setTriggerCam(true)
    }

    const handlerButtonIngresar = () => {
              
        if (placaModal === "" || marcaIni === "" || marcaFin === "" || kilometraje === "" || tipo === "") {
            guardarErrorModal(true)
            console.log(guardarErrorModal)
            setModal(true);
            return;
        }
        guardarErrorModal(false);
        setModal(false);

        console.log("CAMION", camionModal);

        const llenado = marcaFin - marcaIni
        console.log('Resta', llenado);

        const objGasolina = {
            placa_camion: camionModal[0].placa,
            fecha: Date.now(),
            ruta: camionModal[0].ruta,
            descarga: llenado,
            cedi: usuarioIniciado.cedi,
            tipo: tipo
        }
        console.log("GASOLINA", objGasolina);

        const rebajoBodega = (superG[0].cap_actual - llenado)

        console.log("BODEGA", rebajoBodega);

        const objBodega = {
            cap_actual: (rebajoBodega)
        }
        console.log("ACtual", superG[0].cap_actual);
        console.log("rebajado", objBodega);

        if(trigger){
            setTriggerApp(true)
            const AgregarCargaGas = async() => {
                const result = await axios.post(`${apiProd}descarga_gasols`, objGasolina)
                if(result.status === 200){
                    console.log("DESCARGA");
                }
                setTrigger(false)
            }
            AgregarCargaGas();
        }
        setTriggerApp(false)


        if(triggerBod){
        const EditarBodega = async() => {
            const result =  await axios.patch(`${apiProd}bod_combustibles/${bodegaRef.current}`, objBodega)
            if(result.status === 200){
                Swal.fire(
                    `Se han agredado ${llenado}Lts al camión ${camionModal[0].placa}`,
                        'Se ha ingresado correctamente',
                        'success'
                )
                const bita = await axios.post(`${apiProd}bitacoraTallers`, {
                    idUsuario: usuarioIniciado.id,
                    accion: `Ha ingresado una descarga de combustible el usuario: ${usuarioIniciado.name}`,
                    fecha: Date.now()
                });
                if(bita.status === 200){
                    console.log('se ha agregado a la bitacora');

                }
            }
            setTriggerBod(false)
            setTriggerApp(true)

        }
        EditarBodega()
        idCamion.current = parseFloat(camionModal[0].id)
        console.log("PREMIOO", idCamion.current);
        
    }

    if(triggerCam){

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
                        console.log('MENORR');
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
                       console.log("MAYORR");
                    }
            }
            EditarCamion()
            
        }
    }
    }
    
    const handlePlaca = () => {

        if(placaModal !== ''){
        console.log("PASAAASS");
                const queryCamion = async () => {
                    const response = await axios.get(`${apiProd}camions/?filter[where][placa]=${placaModal}`)
                    if(response.data.length === 0){
                        Swal.fire(
                            `Placa ${placaModal}, no encontrada`,
                            'Intenta nuevamente',
                            'error',
                        )
                        setCamionModal([])
                    }
                    setCamionModal(response.data)
                }
                queryCamion()
        }else{
            Swal.fire(
                'Espacio Necesario',
                'Intente nuevamente',
                'error',
            )
        }
    }

    return (
        <Fragment>
            <h1 className="text-center">Combustible Super Gas
            </h1>
            {(error) ? <Error mensaje='Campo fecha son obligatorios' /> : null}
            <form className="mt-2 mb-2" onSubmit={recarga}>
                <label className="ml-3">Fecha:</label>
                <div className="form-row">

                    <div className="form-group w-25 ml-3">
                        <input type="date" className="form-control" name="fecha_reparacion" onChange={e => setFecha(e.target.value)} />
                    </div>
                </div>

                <input type="submit" className="btn btn-primary ml-3 mr-2 mt-2" value="Consultar Gasto" />

                <Button color="info" className="mt-2" onClick={handlerButtonAgregar}>Agregar Gasto</Button>

                <Button color="success" className="mt-2 ml-3" onClick={handleCisterna}>Cisternas Combustibles</Button>

                                                    <Modal
                                                        isOpen={modal}
                                                        toggle={toggle}
                                                        aria-labelledby="contained-modal-title-vcenter"
                                                        centered>
                                                        <ModalHeader toggle={toggle}>Combustible</ModalHeader>
                                                        <ModalBody>
                                                        {(errorModal) ? <Error mensaje='Todos los campos son obligatorios' /> : null}

                                                            <div className="form-group w-50">
                                                                <h6>Placa:</h6>
                                                                <input
                                                                    type="text"
                                                                    className="form-control mt-3  mr-3 mb-1"
                                                                    onChange={e => setPlacaModal(e.target.value)}
                                                                     />
                                                                     <Button className="btn btn-success mt-2" onClick={handlePlaca}>Cargar Camion</Button>
                                                            </div>

                                                            {(camionModal.length !== 0) ?
                                                                <div className="form-group w-50">
                                                                    <h6>Ruta:</h6>
                                                                    <input
                                                                        id="disabledInput"
                                                                        type="text"
                                                                        className="form-control mt-3  mr-3 mb-1"
                                                                        disabled="true"
                                                                        ref={referenciaRuta}
                                                                        defaultValue={camionModal[0].ruta}
                                                                         />
                                                                </div>
                                                                : null}

                                                                {(camionModal.length !== 0) ?
                                                                    <div className="form-group w-50">
                                                                        <label>Tipo:</label>
                                                                       <select className="custom-select"  onChange={e => setTipo(e.target.value)}>
                                                                       <option value="">Tipo</option>
                                                                       <option value="Recope">Viajes a Recope</option>
                                                                       <option value="Aquilados">Viaje de Alquilados</option>
                                                                       <option value="Metalco">Metalco</option>
                                                                       <option value="La Cruz">La Cruz</option>
                                                                       <option value="Carreta Guapiles">Carreta Guápiles</option>
                                                                       <option value="Tanden">Tanden</option>
                                                                       <option value="Carreta Sur">Carreta Zona Sur</option>
                                                                       <option value="Traslados">Traslados</option>
                                                                       </select>
                                                                    </div>
                                                                    : null}

                                                                {(camionModal.length !== 0) ?
                                                                    <div className="form-group w-50">
                                                                        <h6>Marca Inicial:</h6>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control mt-3  mr-3 mb-1"
                                                                            onChange={e => setMarcaIni(e.target.value)}
                                                                             />
                                                                    </div>
                                                                     : null}

                                                                     {(camionModal.length !== 0) ?
                                                                        <div className="form-group w-50">
                                                                            <h6>Marca Final:</h6>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control mt-3  mr-3 mb-1"
                                                                                onChange={e => setMarcaFin(e.target.value)}
                                                                                 />
                                                                        </div>
                                                                         : null}

                                                                         {(camionModal.length !== 0) ?
                                                                            <div className="form-group w-50">
                                                                                <h6>Kilometraje:</h6>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control mt-3  mr-3 mb-1"
                                                                                    onChange={e => setKilometraje(e.target.value)}
                                                                                     />
                                                                            </div>
                                                                             : null}

                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={handlerButtonIngresar}>Ingresar</Button>{' '}
                                                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                                                        </ModalFooter>
                                                    </Modal>
                                                    <Modal
                                                        isOpen={modalCisterna}
                                                        toggle1={toggle1}
                                                        aria-labelledby="contained-modal-title-vcenter"
                                                        centered>
                                                        <ModalHeader toggle1={toggle1}>Recarga Cisterna</ModalHeader>
                                                        <ModalBody>
                                                            <div className="form-group w-50">
                                                                <h6>Código:</h6>
                                                                <input
                                                                    type="password"
                                                                    className="form-control mt-3  mr-3 mb-1"
                                                                    onChange={e => setCodigo(e.target.value)}
                                                                     />
                                                            </div>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={handleLleno}>Ingresar</Button>{' '}
                                                            <Button color="secondary" onClick={toggle1}>Cancel</Button>
                                                        </ModalFooter>
                                                    </Modal>

        {(gasolina.length === 0) ?
            <div className="alert alert-dismissible alert-light mt-3">
            <h4 className="alert-heading text-center">No hay Datos</h4>
            <p className="mb-0 text-center">Consulte los datos Primero</p>
            </div>
            :
                <ul className="list-group mt-5">
                {gasolina.map(gaso => (
                <SPLista 
                key={gaso.id}
                gaso={gaso}
                usuarioIniciado={usuarioIniciado}
                inicioSesion={inicioSesion}
                />
            ))}
            </ul>
        } 
            
            </form>
        </Fragment >
        )
}


export default SuperGas