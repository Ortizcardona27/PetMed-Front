import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AdopcionForm = () => {
    const [viviendaPropia, setViviendaPropia] = useState(false);
    const [nroPersonas, setNroPersonas] = useState('');
    const [ingresos, setIngresos] = useState('');
    const [hogar, setHogar] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mascotaId = queryParams.get('idMascota');

    const handleViviendaPropia = (e) => {
        setViviendaPropia(e.target.checked);
    };

    const handleNroPersonas = (e) => {
        const valor = e.target.value;
        if (!isNaN(valor)) {
            setNroPersonas(valor);
        }
    };

    const handleIngresos = (e) => {
        const valor = e.target.value;
        if (!isNaN(valor)) {
            setIngresos(valor);
        }
    };

    const handleHogar = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Eliminar el prefijo
                setImageBase64(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            viviendaPropia: viviendaPropia,
            nroPersonas: nroPersonas,
            ingresos: ingresos,
            casa: imageBase64,
            idAdopcion: mascotaId
        };

        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        fetch('api/adopciones/formulario/registrar', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
            method: 'POST',
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            }).then((data) => {
                setRespuesta(data.respuesta)
            })
            .catch((error) => console.error(error));
    };


    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <label className="label">
                ¿Tiene vivienda propia?
                <input type="checkbox" required checked={viviendaPropia} onChange={handleViviendaPropia} className="input" />
            </label>

            <label className="label">
                Número de personas que viven en el hogar:
                <input type="number" required value={nroPersonas} onChange={handleNroPersonas} className="input" />
            </label>

            <label className="label">
                Ingresos mensuales en el hogar:
                <input type="number" required value={ingresos} onChange={handleIngresos} className="input" />
            </label>

            <label className="label">
                Foto de su hogar:
                <input type="file" required accept="image/*" onChange={handleHogar} className="input" />
            </label>

            <button className="boton" type="submit">Enviar formulario</button>
            {
                respuesta && (<p>{respuesta} </p>)
            }
        </form>
    )
}

export default AdopcionForm
