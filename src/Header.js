import React from 'react';
import { Link } from "react-router-dom";

const Header = () =>{
    

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to="/Taller" className="navbar-brand">
                    Taller Tomza
                </Link>
            </div>
        </nav>
    );
}

export default Header;