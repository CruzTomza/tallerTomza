import React from 'react';



function CamionLista({camion} ){


    return(

        <li className="list-group-item d-flex justify-content-between align-item-center" data-categoria={camion.unidad_negocio}>
            <p>
                        <span className="font-weight-bold text-info">Placa: {camion.placa}{' '}</span><br></br>
                        <span className="font-weight-bold">  Cedi: {camion.unidad_negocio}</span><br></br>
                        <span className="font-weight-bold">  Ruta: {camion.ruta}</span><br></br>
                        <span className="font-weight-bold">  Marca: {camion.marca}</span><br></br>
                        <span className="font-weight-bold">  Kilometraje: {camion.kmTotal} km</span><br></br>       
            </p>
            
        </li>

    );


}

export default CamionLista;