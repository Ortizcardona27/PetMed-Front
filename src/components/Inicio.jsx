import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Inicio = () => {

    const [mascotas, setMascotas] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMascotas = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`adopciones/mascota/mascotas-destacadas?page=${pagina}`);
                setMascotas(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
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
        setPagina(pagina - 1);
    };

    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
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
                    {pagina > 0 && (
                        <button onClick={handleAnterior}>Anterior</button>
                    )}
                    {mascotas.length >= 5 && (
                        <button onClick={handleSiguiente}>Siguiente</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Inicio
