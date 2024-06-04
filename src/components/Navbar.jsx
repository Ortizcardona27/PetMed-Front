import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1>PetMed</h1>
      </Link>
      <ul className="menu">
        <li>
          <Link to="/" className="menu-link">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/login" className="menu-link">
            Iniciar sesión
          </Link>
        </li>
        <li>
          <Link to="/registerform" className="menu-link">
            Registrarse
          </Link>
        </li>
        <li>
          <Link to="/logout" className="menu-link">
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;