import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Direccion = () => {

    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
    const [idMunicipio, setIdMunicipio] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [nota, setNota] = useState('');

    useEffect(() => {
        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        axios.get('api/usuarios/direccion/departamentos', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
            .then(response => {
                setDepartamentos(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDepartamentoChange = (event) => {
        setDepartamentoSeleccionado(event.target.value);
        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        axios.get(`api/usuarios/direccion/municipios?idDepartamento=${event.target.value}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
            .then(response => {
                setMunicipios(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDireccionChange = (event) => {
        setDireccion(event.target.value);
    };

    const handleNotaChange = (event) => {
        setNota(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const datos = {
            departamento: departamentoSeleccionado,
            municipio: municipios.find(municipio => municipio.id === parseInt(event.target.municipio.value)),
            direccion,
            nota
        };

        const payload = {
            idMunicipio: idMunicipio,
            direccion: direccion,
            nota: nota
        };

        const tokenString = localStorage.getItem('token');
        let token = {};
        if (tokenString) {
            token = JSON.parse(tokenString);
        }
        axios.post('api/usuarios/direccion/registrar', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="formulario-container">
            <div className="formulario-header">
                <h2>Formulario de Dirección</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="formulario-group">
                    <label>Departamento:</label>
                    <select value={departamentoSeleccionado} onChange={handleDepartamentoChange}>
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map(departamento => (
                            <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="formulario-group">
                    <label>Municipio:</label>
                    <select name="municipio">
                        <option value="">Seleccione un municipio</option>
                        {municipios.map(municipio => (
                            <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="formulario-group">
                    <label>Dirección:</label>
                    <input type="text" value={direccion} onChange={handleDireccionChange} />
                </div>
                <div className="formulario-group">
                    <label>Nota:</label>
                    <textarea value={nota} onChange={handleNotaChange} />
                </div>
                <div className="formulario-group">
                    <button type="submit" className="btn-azul">Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default Direccion
