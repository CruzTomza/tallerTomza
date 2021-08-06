import axios from 'axios';
import React, { useState, Fragment, useEffect } from 'react'
import environment from '../env/environment'
import { Link } from "react-router-dom";
import CamionLista from './MantenimientoLista'
import Error from '../pages/Error'
import { GoTools } from "react-icons/go";
import { GiWeight } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";

function Mantenimiento() {

    return (
        <Fragment>
            <div class="col-md-8 mx-auto">
                <h1 className="mt-4 text-center">Mantenimiento</h1>
                <div className='d-flex justify-content-center mt-4'>
                    <Link to="/Taller/mante/rtv">
                        <div className='border mt-4 mr-4 text-primary text-center hover-shadow'>
                            <GoTools size="8em" className='m-4' /><br />
                            <hr></hr>
                            <h6>RTV</h6>
                        </div>
                    </Link>
                    <Link to="/Taller/mante/pesosdimensiones">
                        <div className='border mt-4 mr-4 text-secondary text-center hover-shadow'>
                            <GiWeight size="8em" className='m-4' /><br />
                            <hr></hr>
                            <h6>Pesos y Dimensiones</h6>
                        </div>
                    </Link>
                    <Link to="/Taller/mante/minae">
                        <div className='border mt-4 text-success text-center hover-shadow'>
                            <FaLeaf size="8em" className='m-4' /><br />
                            <hr></hr>
                            <h6>MINAE</h6>
                        </div>
                    </Link>
                </div>
            </div>
        </Fragment>

    )
}

export default Mantenimiento
