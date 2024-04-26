import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
          <Link to="/" className="logo"><h1>PetMed</h1></Link>
          <ul className="menu">
            <li><Link className="menu-Link" to="/">Inicio</Link></li>
            <li><Link className="menu-Link" to="/login">Login</Link></li>

          </ul>
        </nav>
    )
};

export default Navbar;