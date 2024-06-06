import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Consultas = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        axios.get('api/adopciones/adopcion/solicitudes-activas')
            .then(response => {
                setSolicitudes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleFormulario = () => {

    };

    const handleCita = () => {

    };

    return (
        <div className="adopciones-activas">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                solicitudes.map(solicitud => (
                    <div key={solicitud.id} className="card">
                        <img src={solicitud.mascota.imagen} alt={solicitud.mascota.nombre} />
                        <h2>{solicitud.mascota.nombre}</h2>
                        <p>Fundación: {solicitud.fundacion}</p>
                        <p>Estado: {solicitud.estado}</p>
                        {solicitud.estado === 'SOLICITUD' ? (
                            <p>Esperando a que el estado sea FORMULARIO...</p>
                        ) : (
                            <div className="botones">
                                <button className="btn-formulario" onClick={() => handleFormulario()}>Formulario</button>
                                <button className="btn-cita" onClick={() => handleCita()}>Cita</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}

export default Consultas
