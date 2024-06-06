import React, { useState } from 'react';

const AdopcionForm = () => {
    const [tieneVivienda, setTieneVivienda] = useState(false);
    const [numPersonas, setNumPersonas] = useState('');
    const [ingresosMensuales, setIngresosMensuales] = useState('');
    const [fotoHogar, setFotoHogar] = useState(null);

    const handleTieneVivienda = (e) => {
        setTieneVivienda(e.target.checked);
    };

    const handleNumPersonas = (e) => {
        const valor = e.target.value;
        if (!isNaN(valor)) {
            setNumPersonas(valor);
        }
    };

    const handleIngresosMensuales = (e) => {
        const valor = e.target.value;
        if (!isNaN(valor)) {
            setIngresosMensuales(valor);
        }
    };

    const handleFotoHogar = (e) => {
        setFotoHogar(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('tieneVivienda', tieneVivienda);
        formData.append('numPersonas', numPersonas);
        formData.append('ingresosMensuales', ingresosMensuales);
        formData.append('fotoHogar', fotoHogar);

        fetch('api/adopciones/formulario/registrar', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <label className="label">
                ¿Tiene vivienda propia?
                <input type="checkbox" checked={tieneVivienda} onChange={handleTieneVivienda} className="input" />
            </label>

            <label className="label">
                Número de personas que viven en el hogar:
                <input type="number" value={numPersonas} onChange={handleNumPersonas} className="input" />
            </label>

            <label className="label">
                Ingresos mensuales en el hogar:
                <input type="number" value={ingresosMensuales} onChange={handleIngresosMensuales} className="input" />
            </label>

            <label className="label">
                Foto de su hogar:
                <input type="file" onChange={handleFotoHogar} className="input" />
            </label>

            <button className="boton" type="submit">Enviar formulario</button>
        </form>
    )
}

export default AdopcionForm
