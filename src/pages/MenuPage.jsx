import React from 'react'
import { Link } from "react-router-dom";
import { GiAutoRepair, GiGasPump } from "react-icons/gi";
import { FaOilCan } from "react-icons/fa" 
import { GrHostMaintenance} from "react-icons/gr"
import { HiTruck } from "react-icons/hi" 


const MenuPage = ({usuarioIniciado,setTriggerApp}) => {
    console.log("JUEEEE", usuarioIniciado.rol);

    const handleBodega =() => {
        setTriggerApp(true)
      }

    return (
        <div className="col-md-8 mx-auto text-center mt-4">

        {((usuarioIniciado.rol === 'Admin' || usuarioIniciado.rol === 'Taller' || usuarioIniciado.rol === 'Combustible')) ?
        (<Link to="/Taller/camion" className="btn btn-outline-info m-2"><HiTruck size="8em" /><br />
        <div className="dropdown-divider mr-0 mt-1 mb-0 ml-0"></div>Camiones</Link>) : null }

        {((usuarioIniciado.rol === 'Admin' || usuarioIniciado.rol === 'Supervisor' || usuarioIniciado.rol === 'Taller')) ?
        <Link to="/Taller/repa" className="btn btn-outline-warning m-2"><GiAutoRepair size="8em" /><br />
        <div className="dropdown-divider mr-0 mt-1 mb-0 ml-0"></div>Reparaciones</Link> : null }

        {((usuarioIniciado.rol === 'Admin' || usuarioIniciado.rol === 'Supervisor' || usuarioIniciado.rol === 'Taller')) ?
        <Link to="/Taller/cambio" className="btn btn-outline-danger m-2"><FaOilCan size="8em" /><br />
        <div className="dropdown-divider mr-0 mt-1 mb-0 ml-0"></div>Cambio de Aceite</Link> : null }

        {((usuarioIniciado.rol === 'Admin' || usuarioIniciado.rol === 'Supervisor' || usuarioIniciado.rol === 'Taller')) ?
        <Link to="/Taller/mante" className="btn btn-outline-primary m-2"><GrHostMaintenance size="8em" /><br />
        <div className="dropdown-divider mr-0 mt-1 mb-0 ml-0"></div>Mantenimiento</Link> : null }

        {((usuarioIniciado.rol === 'Admin' || usuarioIniciado.rol === 'Combustible')) ?
        <Link to="/Taller/gas" className="btn btn-outline-dark m-2" onClick={handleBodega}><GiGasPump size="8em" /><br />
        <div className="dropdown-divider mr-0 mt-1 mb-0 ml-0"></div>Combustible</Link> : null }

        </div>
    )
}


export default MenuPage

