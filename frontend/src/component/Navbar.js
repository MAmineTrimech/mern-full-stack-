import React from 'react';
import { Link } from 'react-router-dom';
import logoSrc from '../images/logo192.png'; 

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container">
                <Link className="navbar-brand text-white" to="/">
                    <img src={logoSrc} alt="Logo" style={{ width: '120px', marginRight: '10px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link btn btn-primary text-white" to="/allstud">My Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn btn-primary text-white" to="/addstud">Add New Student</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn btn-primary text-white" to="/addform">Add New Formation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn btn-primary text-white" to="/getform">Mes Formations</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
