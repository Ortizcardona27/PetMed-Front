import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const ModalCita = () => {

    const [cita, setCita] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const adopcionId = queryParams.get('idAdopcion');
    const navigate = useNavigate();

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        axios.get(`api/adopciones/cita/detalle-cita?idAdopcion=${adopcionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
            .then(response => {
                setCita(response.data);
                setShowModal(true);
            })
            .catch(error => {
                setError(error.response.data.respuesta)
                setShowErrorModal(true);

            });
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/consultas');
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        navigate('/consultas');
    };

    return (
        <div>
            {showModal && (
                <div className="modalcita">
                    <div className="modalcita-content">
                        <h2>Detalle de la cita:</h2>
                        <p>Fecha: {new Date(cita.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                        <p>Direccion: {cita.direccion}</p>
                        <p>Lugar: {cita.lugar}</p>
                        <button onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
            {showErrorModal && (
                <div className="modalcita">
                    <div className="modalcita-content">
                        <h2>Advertencia:</h2>
                        <p>{error}</p>
                        <button onClick={handleCloseErrorModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalCita
