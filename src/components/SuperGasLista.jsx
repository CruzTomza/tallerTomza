import React from 'react';



function SPLista({gaso} ){


    return(

        <li className="list-group-item d-flex justify-content-between align-item-center" data-categoria={gaso.placa_camion}>
            <p>
                        <span className="font-weight-bold text-info">Placa: {gaso.placa_camion}{' '}</span><br></br>
                        <span className="font-weight-bold">  Cedi: {gaso.cedi}</span><br></br>
                        <span className="font-weight-bold">  Ruta: {gaso.ruta}</span><br></br>
                        <span className="font-weight-bold">  Descarga: {gaso.descarga}</span><br></br>
            </p>
            
        </li>

    );


}

export default SPLista;