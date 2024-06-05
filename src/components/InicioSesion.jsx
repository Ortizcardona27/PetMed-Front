import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from "axios";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const token = (code) => {
  const formData = new FormData();
  formData.append('code', code);
  formData.append('grant_type', 'authorization_code');
  formData.append('redirect_uri', 'http://localhost:3000/iniciosesion');

  axios.post('/auth/oauth2/token', formData, {
    headers: {
      'Authorization': 'Basic ' + btoa('users-petmed:2024')
    }
  })
    .then(response => {
      console.log(response);
      const token = JSON.stringify(response.data);
      localStorage.setItem('token', token);
      window.opener.postMessage('closed', '*');
      window.close();
    })
    .catch(error => {
      console.log(error);
      if (error.response && error.response.status !== 400) {
        alert(error.response.data.respuesta);
      }
      else {
        alert('Hay un error');
      }
    });
}

const InicioSesion = () => {
  const query = useQuery();
  const code = query.get('code');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    token(code);
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, [code]);

  return (
    <div>
      {loggedIn ? (
        <p>El usuario ha iniciado sesión correctamente</p>
      ) : (
        <p>Iniciando sesión...</p>
      )}
    </div>
  )
}

export default InicioSesion