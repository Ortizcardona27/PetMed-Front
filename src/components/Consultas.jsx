import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Consultas = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        axios.get('api/adopciones/adopcion/solicitudes-activas', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
            .then(response => {
                setSolicitudes(response.data);
                console.log(response)
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleFormulario = (Id) => {
        navigate(`/adopcionForm?idMascota=${Id}`)
    };

    const handleCita = () => {

    };

    return (
        <div className="adopciones-activas">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                solicitudes.map((solicitud, index) => (
                    <div key={index} className="card">
                        <img src={`data:image/jpeg;base64,${solicitud.imagen}`} alt={solicitud.mascota} />
                        <h2>{solicitud.mascota}</h2>
                        <p>Fundación: {solicitud.fundacion}</p>
                        <p>Estado: {solicitud.estado}</p>
                        {solicitud.estado === 'SOLICITUD' ? (
                            <p>Esperando respuesta de la fundación.</p>
                        ) : (
                            <div className="botones">
                                {
                                    solicitud.formulario && (<button className="btn-formulario" onClick={() => handleFormulario(solicitud.idAdopcion)}>Formulario</button>)
                                }
                                {
                                    solicitud.cita && (<button className="btn-cita" onClick={() => handleCita()}>Cita</button>)
                                }
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}

export default Consultas
