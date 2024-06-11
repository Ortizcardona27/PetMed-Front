import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecuperarContraseña = () => {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.get(`auth/email/recuperar?correo=${email}&cliente=usuarios`,)
            .then(response => {
                setResponse(response.data.respuesta);
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });

    };
    return (
        <div className="email-recovery-container">
            <form onSubmit={handleSubmit} className="email-recovery-form">
                <label className="email-label">
                    Ingresa tu correo electrónico:
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="email-input"
                    />
                </label>
                <button type="submit" className="email-submit-btn">
                    Enviar
                </button>
            </form>
            {response && (
                <p>{response} </p>
            )}
        </div>
    )
}

export default RecuperarContraseña
