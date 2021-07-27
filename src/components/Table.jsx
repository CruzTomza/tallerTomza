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

    const formatFecha = () => {
        let formatted
        let arrayFechas = []
        
        for (var i=0; i<tableBody.length; i++) {
            
            let date = new Date(tableBody[i].entrada)
            formatted = date.toLocaleString('es-Es')
            tableBody[i].entrada= formatted
            console.log('...',date.toLocaleString('es-Es'),tableBody);
        }
        return formatted
    }
   
    console.log('header', header, 'dataBody', tableBody)
    return (
        <section>
            <div>
                <table className='table'>
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
                                    {x.id}
                                </td>
                                <td>
                                    {x.cedi}
                                </td>
                                <td>
                                    {formatFecha()}
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