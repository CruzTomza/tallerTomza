import React,{useState} from 'react'


function CamionLista({camion,inicioSesion,usuarioIniciado} ){


//     var cadena = camion.placa;
//     console.log("QUEEE", cadena);
//     var ultimo = cadena.charAt(cadena.length -1)
//     console.log("ULTIMOO", ultimo);

//     const placa1y7 = 'Enero y Julio'
//     const placa2y8 = 'Febrero y Agosto'
//     const placa3y9 = 'Marzo y Setiembre'
//     const placa4 = 'Abril y Octubre'
//     const placa5y0 = 'Mayo y Noviembre'

//     if(camion.length !== 0){
//         setTrigger(true)
//     }
//     if(trigger){
//     if(ultimo === '1' ){
//     setRtv(placa1y7)
//     setTrigger(false)
//     }
// }
    // if(ultimo === 2 && ultimo === 8){
    //     setRtv('Febrero y Agosto')
    // }
    // if(ultimo === 3 && ultimo === 9){
    //     setRtv('Marzo y Setiembre')
    // }
    // if(ultimo === 4){
    //     setRtv('Abril y Octubre')
    // }
    // if(ultimo === 5 && ultimo === 0){
    //     setRtv('Mayo y Noviembre')
    // }


    return(

        <li className="list-group-item d-flex justify-content-between align-item-center" data-categoria={camion.unidad_negocio}>
            <p>
                <span className="font-weight-bold text-warning">Camion: {camion.marca}{' '}</span><br></br>
                <span className="font-weight-bold">  Placa: {camion.placa}</span><br></br>
                 {/*<span className="font-weight-bold">  Ruta: {camion.ruta}</span><br></br>*/}
                <span className="font-weight-bold">  Unidad de Negocio: {camion.unidad_negocio}</span><br></br>
                <span className="font-weight-bold">  RTV: {camion.rtv}</span><br></br>
                <span className="font-weight-bold">  TC: {camion.tc}</span><br></br>
            </p>
            
        </li>

    );


}

export default CamionLista;

//{`/choferes/editar/${camion.id}`}