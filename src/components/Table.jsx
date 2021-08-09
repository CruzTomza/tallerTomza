import React, { useState, useEffect } from 'react'

function Table(props) {
    console.log(props)
    const [header, setHeader] = useState(props.dataHeader)
    const [tableBody, setTableBody] = useState([]) 
    const [trigger, setTrigger] = useState(true)

    useEffect (() => {
        if (trigger) {
            setTableBody([props.dataBody])
            setTrigger(false)
        }
    })

    const formatFecha = (x) => {
        let formatted

        let date = new Date(x)
        formatted = date.toLocaleString('es-Es')

        console.log('formatted',formatted);
        return formatted
        
        // for (var i=0; i<tableBody.length; i++) {
            
        //     let date = new Date(tableBody[i].entrada)
        //     formatted = date.toLocaleString('es-Es')
        //     tableBody[i].entrada= formatted
        //     console.log('...',date.toLocaleString('es-Es'),tableBody);
        // }
        // return formatted
    }
   
    console.log('header', header, 'dataBody', tableBody)
    return (
        <section>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            {header.map(x =>
                                <th scope='col'>{x}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody.map(x => 
                            <tr>
                                <td>
                                    {x.idCamion}
                                </td>
                                <td>
                                    {x.cedi}
                                </td>
                                <td>
                                    {formatFecha(x.entrada)}
                                </td>
                                <td>
                                    {x.salida}
                                </td>
                                <td>
                                    {x.reporte}
                                </td>
                                <td>
                                    {x.aprobado}
                                </td>
                                
                                <td>
                                    {x.repuestos}
                                </td>
                                <td>
                                    {x.costo}
                                </td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </section>

    )
}
export default Table