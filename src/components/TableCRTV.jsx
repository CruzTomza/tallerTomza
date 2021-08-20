import React, { useState, useEffect } from 'react'
import environment from '../env/environment'
import axios from 'axios';

function TableCRTV(props) {
    console.log(props)
    const [header, setHeader] = useState(props.headers)
    const [tableBody, setTableBody] = useState([])
    const [trigger, setTrigger] = useState(true)
    const [rTVAlerta, setRTVAlerta] = useState([])
    const [mount, setMount] = useState(true)
    const [datosCamion, setDatosCamion] = useState([])
    var rtvms = []

    const apiProd = environment.url

    useEffect(() => {
        if (trigger) {
            setTableBody(props.props)
            setTrigger(false)
        }
    })

    const getDate = () => {
        const date = new Date()
        var currentMonth = date.getMonth() + 1

        switch (currentMonth) {
            case 7:
                currentMonth = 1 
                break;
            case 8:
                currentMonth = 2
                break;
            case 9:
                currentMonth = 3
                break;
            case 10:
                currentMonth = 4
                break;
            case 11:
                currentMonth = 5
                break;
            case 12:
                currentMonth = 6
                break;
            default:
                currentMonth = date.getMonth() + 1
        }
        return currentMonth
    }

    console.log('mount', mount);
    if (mount) {
        
        const queryCamion = async () => {
            const response = await axios.get(`${apiProd}camions`)
            setDatosCamion(response.data)
            const alertaCamiones = () => {
                var datos = response.data
                for (var i = 0; i < datos.length; i++) {
                    let rtvMonth = 0
                    
                    console.log('rtv',rtvms);
                    switch (datos[i].rtv) {
                        case 'Enero y Julio':
                            rtvMonth = 1 
                            break;
                        case 'Febrero y Agosto':
                            rtvMonth = 2
                            break;
                        case 'Marzo y Setiembre':
                            rtvMonth = 3
                            break;
                        case 'Abril y Octubre':
                            rtvMonth = 4
                            break;
                        case 'Mayo y Noviembre':
                            rtvMonth = 5
                            break;
                        case 'Junio y Diciembre':
                            rtvMonth = 6
                            break;
                        default:
                            rtvMonth = 0
                    }
                    console.log(getDate(), 'rtv',rtvMonth);
                    if (rtvMonth === getDate() || getDate() - 1) {
                        console.log('rtvMonth',rtvMonth);
                        rtvms.push(datos[i])
                        console.log('alerta', rtvms);
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
                    (rtvms.length > 0) ?
                        <table className='table mt-4'>
                            <thead>
                                <tr>
                                    {header.map(x =>
                                        <th>{x}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {rtvms.map(x =>
                                    <tr>
                                        <td>
                                            {x.placa}
                                        </td>
                                        <td>
                                            {x.rtv}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        :
                        <div className="alert alert-dismissible alert-light mt-3">
                            <h4 className="alert-heading text-center" >Sin RTV pendiente</h4>
                        </div>
                }

            </div>
        </section>

    )
}
export default TableCRTV
