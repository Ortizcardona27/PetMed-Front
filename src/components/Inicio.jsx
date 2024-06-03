import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Inicio = () => {
    const [mascotas, setMascotas] = useState({});
    const [pagina, setPagina] = useState(1);  // Cambiado a 1 ya que tu API empieza en página 1
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMascotas = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/adopciones/mascota/mascotas-destacadas?page=${pagina}`);
                setMascotas(response.data);
            } catch (error) {
                setError('Error al cargar las mascotas. Intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, [pagina]);

    const handleInfo = (mascota) => {
        console.log(`Información mascota: ${mascota.nombre}`);
        return <Link to="/infoMascota">Más información</Link>;
        //{`/detalle-mascota/${mascota.id}`}
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
                    {(mascotas.content) && (mascotas.content.slice(0, 5).map((mascota, index) => (
                        <div key={index} className="mascota-card">
                            <img src={`data:image/jpeg;base64,${mascota.imagen}`} alt={mascota.nombre} />
                            <h2>{mascota.nombre}</h2>
                            <p>{mascota.descripcion}</p>
                            <button onClick={() => handleInfo(mascota)}>{handleInfo(mascota)}</button>
                        </div>
                    )))}
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
