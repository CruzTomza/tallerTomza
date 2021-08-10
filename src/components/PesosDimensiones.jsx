import React, { Fragment, useState, useEffect } from 'react';


function PesosDimensiones({ camion }) {
    const consulta = () => {

    }

    return (
        <div className='col-md-8 text-center mx-auto mt-4'>
            <h1 className='pb-4'>Pesos y Dimensiones</h1>
            <form className='mt-2' onSubmit={consulta}>
                <div className='form-row'>
                    <div className='form-group'>
                        <select>
                        <option>Enero</option>
                        <option>Febrero</option>
                        <option>Marzo</option>
                        <option>Abril</option>
                        <option>Mayo</option>
                        <option>Junio</option>
                        <option>Julio</option>
                        <option>Agosto</option>
                        <option>Septiembre</option>
                        <option>Octubre</option>
                        <option>Noviembre</option>
                        <option>Diciembre</option>
                        </select>
                    </div>
                </div>

            </form>
        </div>
    )
}
export default PesosDimensiones;