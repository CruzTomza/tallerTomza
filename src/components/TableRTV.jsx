import React, { useState, useEffect } from 'react'


function Table(props) {
    console.log(props)
    const [header, setHeader] = useState(props.headers)
    const [tableBody, setTableBody] = useState([])
    const [trigger, setTrigger] = useState(true)

    useEffect(() => {
        if (trigger) {
            setTableBody(props.props)
            setTrigger(false)
        }
    })

    const formatFecha = () => {
        let formatted
        let arrayFechas = []
        
        for (var i=0; i<tableBody.length; i++) {
            
            let date = new Date(tableBody[i].tc)
            console.log(tableBody[i].tc);
            formatted = date.toLocaleString('es-Es')
            tableBody[i].tc= formatted
            console.log('...',date.toLocaleString('es-Es'),tableBody);
        }
        return formatted
    }
    console.log('header', header, 'dataBody', tableBody)
    return (
        <section>
            <div>
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
                                    {x.unidad_negocio}
                                </td>
                                <td>
                                    {x.rtv}
                                </td>
                                <td>
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
