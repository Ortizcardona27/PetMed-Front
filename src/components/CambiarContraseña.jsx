import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const CambiarContraseña = () => {
    const [contrasena, setContrasena] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idSolicitud = queryParams.get('id');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            idSolicitud: idSolicitud,
            contrasena: contrasena,
        };

        axios.post('auth/usuario/cambiar-credenciales', payload)
            .then(response => {
                setResponse(response.data.respuesta);
            })
            .catch(error => {
                setError(error.response.data.respuesta)
            });
    }


    return (
        <div className="email-recovery-container">
            <form onSubmit={handleSubmit} className="email-recovery-form">
                <label className="email-label">
                    Ingresa tu nueva contraseña:
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(event) => setContrasena(event.target.value)}
                        className="email-input"
                    />
                </label>
                <button type="submit" className="email-submit-btn">
                    Enviar
                </button>
            </form>
            {response && (
                <p>{response} </p>
            )}
            {error && (
                <p>{error} </p>
            )}
        </div>
    )
}

export default CambiarContraseña
