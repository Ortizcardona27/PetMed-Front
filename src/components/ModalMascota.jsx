import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalMascota = () => {
    const [mascota, setMascota] = useState(null);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [adoptada, setAdoptada] = useState(false); // Nuevo estado para indicar si la mascota ha sido adoptada

    useEffect(() => {
        const fetchMascota = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/adopciones/mascota/detalle-mascota-adopcion?idMascota=27`);
                setMascota(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (isOpen) {
            fetchMascota();
        }
    }, [isOpen]);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleAdoptar = async () => {
        try {
            // Lógica para adoptar la mascota (hacer una petición GET a la API)
            const response = await axios.get(`http://localhost:8085/adopciones/mascota/adoptar-mascota?idMascota=27`);
            setAdoptada(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <div>
                                <h2>{mascota.nombre}</h2>
                                <p>Edad: {mascota.edad}</p>
                                <p>Raza: {mascota.raza}</p>
                                {/* Aquí puedes agregar más información de la mascota */}
                                {adoptada ? (
                                    <p>Mascota adoptada con éxito!</p>
                                ) : (
                                    <button onClick={handleAdoptar}>Adoptar</button>
                                )}
                            </div>
                        )}
                        <button onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalMascota;