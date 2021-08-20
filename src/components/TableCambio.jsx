import React, { useState, useEffect } from 'react'
import environment from '../env/environment'
import axios from 'axios';

function Table(props) {
    console.log(props)
    const [header, setHeader] = useState(props.headers)
    const [tableBody, setTableBody] = useState([])
    const [trigger, setTrigger] = useState(true)
    const [camionAlerta, setCamionAlerta] = useState([])
    const [mount, setMount] = useState(true)
    const [datosCamion, setDatosCamion] = useState([])

    const apiProd = environment.url

    useEffect(() => {
        if (trigger) {
            setTableBody(props.props)
            setTrigger(false)
        }
    })
    
        console.log('mount', mount);
    if (mount){
        const queryCamion = async () => {
            const response = await axios.get(`${apiProd}camions`)
            setDatosCamion(response.data)
            const alertaCamiones = () => {
                var datos = response.data
                for (var i = 0; i < datos.length; i++) {
        
                    if ((datos[i].kmTotal - datos[i].kmInicial) < 3000) {
                        camionAlerta.push(datos[i])
                        console.log('alerta', camionAlerta);
                    }
                }
            }
            alertaCamiones()
        }
        queryCamion()
        
        setMount(false)
    }

    console.log('header', header, 'dataBody', tableBody)
    return (
        <section>
            <div>
            {
                (camionAlerta.length > 0) ?
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            {header.map(x =>
                                <th>{x}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody.map(x =>
                            <tr>
                                <td>
                                    {x.placa}
                                </td>
                                <td>
                                    {x.kmInicial}
                                </td>
                                <td>
                                    {x.kmTotal - x.kmInicial}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <div className="alert alert-dismissible alert-light mt-3">
                    <h4 className="alert-heading text-center" >No existen cambios de aceite próximos</h4>
                </div>
            }
                
            </div>
        </section>

    )
}
export default Table
