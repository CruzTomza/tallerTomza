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
                                    {x.kmInicial}
                                </td>
                                <td>
                                    {x.kmTotal - x.kmInicial}
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
