import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inicio = () => {
    const [mascotas, setMascotas] = useState([]);
    const [pagina, setPagina] = useState(1);  // Cambiado a 1 ya que tu API empieza en página 1
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMascotas = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/adopciones/mascota/mascotas-destacadas?page=${pagina}`);
                setMascotas(response.data);
            } catch (error) {
                setError('Error al cargar las mascotas. Intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, [pagina]);

    const handleAdoptar = (mascota) => {
        // Aquí puedes agregar la lógica para adoptar la mascota
        console.log(`Adoptar mascota: ${mascota.nombre}`);
    };

    const handleSiguiente = () => {
        setPagina(pagina + 1);
    };

    const handleAnterior = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="mascotas-container">
                    {mascotas.slice(0, 5).map((mascota, index) => (
                        <div key={index} className="mascota-card">
                            <img src={mascota.foto} alt={mascota.nombre} />
                            <h2>{mascota.nombre}</h2>
                            <p>{mascota.descripcion}</p>
                            <button onClick={() => handleAdoptar(mascota)}>Adoptar</button>
                        </div>
                    ))}
                    <div className="pagination-buttons">
                        {pagina > 1 && (
                            <button onClick={handleAnterior}>Anterior</button>
                        )}
                        {mascotas.length >= 5 && (
                            <button onClick={handleSiguiente}>Siguiente</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inicio;