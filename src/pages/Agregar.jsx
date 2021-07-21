import axios from 'axios';
import environment from '../env/environment'


const apiProd = environment.url 


export const AgregarReparacion = async (obj, usuarioIniciado, guardarRecarga) => {
    try {
        const resultado = await axios.post(`${apiProd}reparacions`, obj);
        if(resultado.status === 200){
            console.log("Agregado");
        }
    }catch(error) {
        console.log(error);
    }
}