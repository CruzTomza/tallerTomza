import React from 'react'
import { Link } from "react-router-dom";



const Combustible = ({usuarioIniciado, gas, superG}) => {
    console.log("JUEEEE", usuarioIniciado.rol);


    const litrosAlmacenados = (total, almacenados) => {
        const litros = (almacenados * 100) / total;
        let result = Math.round(litros)
        return result.toLocaleString('en-US')
    }


    console.log("CAPACIDA MAX", gas[0].cap_max);
    console.log("CAPACIDAD ACT", gas[0].cap_actual);

    const porceGas = `width: ${litrosAlmacenados(parseInt(gas[0].cap_max), parseInt(gas[0].cap_actual))}%`

    const pG = litrosAlmacenados(parseInt(gas[0].cap_max), parseInt(gas[0].cap_actual))


    const porceSuper = `width: ${litrosAlmacenados(parseInt(superG[0].cap_max), parseInt(superG[0].cap_actual))}%`

    const pS = litrosAlmacenados(parseInt(superG[0].cap_max), parseInt(superG[0].cap_actual))




    return (
        <div className="col-md-8 mx-auto text-center">

        <Link to="/Taller/gas/gastomza" className="btn btn-outline-info m-5"><h1>Gas Tomza</h1>
        <div className="dropdown-divider mr-0 mt-auto mb-4 ml-0"></div>
        <p>
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"
                aria-valuenow={litrosAlmacenados(gas[0].cap_max,gas[0].cap_actual)} aria-valuemin="0" aria-valuemax={gas[0].cap_max} Style={porceGas}>{pG}%</div>
            </div>
        <span className="font-weight-bold text-danger mb-1">Actual: {gas[0].cap_actual}L</span><br></br>
        </p>
        </Link>

        <Link to="/Taller/supergas" className="btn btn-outline-info m-5"><h1>Super Gas</h1>
        <div className="dropdown-divider mr-0 mt-auto mb-4 ml-0"></div>
        <p>
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"
                aria-valuenow={litrosAlmacenados(superG[0].cap_max,superG[0].cap_actual)} aria-valuemin="0" aria-valuemax={gas[0].cap_max} Style={porceSuper}>{pS}%</div>
            </div>
        <span className="font-weight-bold text-danger mb-1">Actual: {superG[0].cap_actual}L</span><br></br>

        </p>
                                 
        </Link>

        </div>
    )
}


export default Combustible

