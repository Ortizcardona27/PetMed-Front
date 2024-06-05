import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalMascota = () => {
    const [mascota, setMascota] = useState({});
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [adoptada, setAdoptada] = useState(false); // Nuevo estado para indicar si la mascota ha sido adoptada
    const navigate = useNavigate();


    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        fetch(`/api/adopciones/mascota/detalle-mascota-adopcion?idMascota=21`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMascota(data)
                setIsOpen(true)
            })
            .catch(error => console.error('Error:', error));

    }, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
        navigate('/');
    };

    const handleAdoptar = async () => {
        try {
            // Lógica para adoptar la mascota (hacer una petición POST a la API)
            const tokenString = localStorage.getItem('token');
            let token = {};
            if (tokenString) {
                token = JSON.parse(tokenString);
            }
            axios.post(`api/adopciones/adopcion/registrar`, {
                idMascota: mascota.idMascota
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.access_token}`
                }
            }).then(response => {
                setExito()
            });
            setAdoptada(true);
        } catch (error) {
            console.log(error)
            setError(error.response.data.respuesta);
        }
    };

    return (
        <div>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 style={{ color: '#007bff' }}>{mascota.nombre}</h2>
                        </div>
                        <div className="modal-body">
                            {error ? (
                                <p style={{ color: 'ed' }}>Error: {error}</p>
                            ) : (
                                <div>
                                    <img src={`data:image/jpeg;base64,${mascota.imagen}`} alt={mascota.nombre} style={{ width: '100px', height: '100px', borderRadius: '100%' }} />
                                    <p>Edad: {mascota.edad}</p>
                                    <p>Raza: {mascota.raza}</p>
                                    <p>Descripcion: {mascota.descripcion}</p>
                                    <p>Rescatista: {mascota.rescatista}</p>

                                    {adoptada ? (
                                        <p style={{ color: 'green' }}>Mascota adoptada con éxito!</p>
                                    ) : (
                                        <button onClick={handleAdoptar} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                                            Adoptar
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCloseModal} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalMascota;