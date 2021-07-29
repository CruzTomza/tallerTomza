import React, { useState, useEffect } from "react";
import axios from 'axios';
import environment from './env/environment'
// import "./App.css";
import 'bootswatch/dist/united/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header'
import MenuPage from './pages/MenuPage'
import Reparacion from './components/Reparacion'
import NotFoundPage from './pages/NotFoundPage'
import LoginUser from './pages/Login'
import CambioAceite from './components/CambioAceite'
import Mantenimiento from './components/Mantenimiento'
import RTV from './components/Rtv'
import PesosDimensiones from './components/PesosDimensiones'
import Minae from './components/Minae'
import AgregarCamion from './components/Camion'
import Combustible from './components/Combustible'
import GasTomza from './components/CombuGas'
import SuperGas from './components/CombuSuper'
import Style from './App.css'

// Función Flecha o Arrow Function
const App = () => {
  const [inicioSesion, guardarInicioSesion] = useState(false)
  const [usuarioIniciado, guardarUsuarioIniciado] = useState({})

  //Combustible
  const [gas, setGas] = useState([])
  const [superG, setSuper] = useState([])
  const [triggerApp, setTriggerApp] = useState(true)

  const apiProd = environment.url

  useEffect(() => {
    if (triggerApp) {
      const queryCediGas = async () => {
        const response = await axios.get(`${apiProd}bod_combustibles?filter[where][cedi]=Gas Tomza`)
        setGas(response.data)
      }
      queryCediGas();
      const queryCediSuper = async () => {
        const response = await axios.get(`${apiProd}bod_combustibles?filter[where][cedi]=Super Gas`)
        setSuper(response.data)
      }
      queryCediSuper();
      setTriggerApp(false)
    }
  }, [triggerApp])

  console.log("BODEGA", gas, superG);

  // Lo que ejecuta la función
  console.log("Renderización de App");
  return (
    <div>
      <Router>
        <Header />

        <Switch>
          {(inicioSesion) ? <Route exact path="/Taller" render={() => (<MenuPage usuarioIniciado={usuarioIniciado} setTriggerApp={setTriggerApp} />)} />
            :
            <Route exact path="/Taller/" component={() => (<LoginUser guardarInicioSesion={guardarInicioSesion} guardarUsuarioIniciado={guardarUsuarioIniciado} />)} />}

          <Route exact path="/Taller/camion" render={() => (<AgregarCamion usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} />)} />

          <Route exact path="/Taller/repa" render={() => (<Reparacion usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} />)} />

          <Route exact path="/Taller/cambio" render={() => (<CambioAceite usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} />)} />

          <Route exact path="/Taller/mante" render={() => (<Mantenimiento usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} />)} />

          <Route exact path="/Taller/mante/rtv" render={() => (<RTV usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} />)} />

          <Route exact path="/Taller/mante/pesosdimensiones" render={() => (<PesosDimensiones usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} />)} />

          <Route exact path="/Taller/mante/minae" render={() => (<Minae usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} />)} />

          <Route exact path="/Taller/gas" render={() => (<Combustible usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} superG={superG} gas={gas} />)} />

          <Route exact path="/Taller/gas/gastomza" render={() => (<GasTomza usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} gas={gas} setTriggerApp={setTriggerApp} />)} />

          <Route exact path="/Taller/supergas" render={() => (<SuperGas usuarioIniciado={usuarioIniciado} inicioSesion={inicioSesion} superG={superG} setTriggerApp={setTriggerApp} />)} />

          <Route>
            <NotFoundPage />
          </Route>

        </Switch>
      </Router>
    </div>
  );
};

export default App;
