import React, { useState } from "react";
import axios from "axios";


const RegisterForm = () => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [nroDocumento, setNroDocumento] = useState("");
  const [telefonoCelular, setTelefonoCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [Nombre, setNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here
    if (tipoDocumento === "") {
      setErrors({ ...errors, tipoDocumento: "El tipo de documento es requerido." });
    }
    if (nroDocumento === "") {
      setErrors({ ...errors, nroDocumento: "El número de documento es requerido." });
    }
    if (telefonoCelular === "") {
      setErrors({ ...errors, telefonoCelular: "El número de celular es requerido." });
    } else if (!/^[0-9]{10}$/.test(telefonoCelular)) {
      setErrors({ ...errors, telefonoCelular: "El número de celular debe tener 10 dígitos." });
    }
    if (email === "") {
      setErrors({ ...errors, email: "El email es requerido." });
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setErrors({ ...errors, email: "El email debe ser válido." });
    }
    if (password === "") {
      setErrors({ ...errors, password: "La contraseña es requerida." });
    }
    if (tipoDocumento === "nit" && razonSocial === "") {
      setErrors({ ...errors, razonSocial: "La razón social es requerida." });
    }
    if (tipoDocumento === "cedula de ciudadania" && (Nombre === "" || primerApellido === "" || segundoApellido === "" || fechaNacimiento === "")) {
      setErrors({ ...errors, Nombre: "El nombre es requerido.", primerApellido: "El primer apellido es requerido.", segundoApellido: "El segundo apellido es requerido.", fechaNacimiento: "La fecha de nacimiento es requerida." });
    }

    if (Object.keys(errors).length === 0) {
      // No hay errores, enviar solicitud a la API
      fetch(`/api/usuarios/usuario/tipo-documento`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          // Manejar la respuesta exitosa aquí
          // Por ejemplo, puedes guardar los datos del usuario en el estado o redirigir a otra página
        })
        .catch(error => console.error('Error:', error));
    }
    if (Object.keys(errors).length === 0) {
      alert("Enviando formulario.")
      // No errors, send request to API
      axios.post('/api/usuarios/persona/crear', {
        nroDocumento: nroDocumento,
        tipoDocumento: tipoDocumento,
        telefonoCelular: telefonoCelular,
        email: email,
        password: password,
        personaNatural: {
          Nombre: Nombre,
          primerApellido: primerApellido,
          segundoApellido: segundoApellido,
          fechaNacimiento: fechaNacimiento
        }
      })
        .then(response => {
          console.log(response.data);
          alert('Se registro con exito')
          // Handle successful response here
          // For example, you can save the user data in the state or redirect to another page
        })
        .catch(error => {
          console.error(error.response.data);
          alert('Hay un error')


          // Handle error response here
          // For example, you can show an error message to the user
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form blue">
      <div className="form-group">
        <label htmlFor="tipoDocumento">Tipo de documento:</label>
        <select
          id="tipoDocumento"
          value={tipoDocumento}
          onChange={(e) => setTipoDocumento(e.target.value)}
          className="form-control"
        >
          <option value="">Selecciona una opción</option>
          <option value="nit">NIT</option>
          <option value="cedula de ciudadania">Cédula de ciudadania</option>
        </select>
        {errors.tipoDocumento && <p className="error">{errors.tipoDocumento}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="nroDocumento">Número de documento:</label>
        <input
          type="text"
          id="nroDocumento"
          value={nroDocumento}
          onChange={(e) => setNroDocumento(e.target.value)}
          className="form-control"
        />
        {errors.nroDocumento && (
          <p className="error">{errors.nroDocumento}</p>
        )}
      </div>
      {tipoDocumento === "nit" && (
        <div className="form-group">
          <label htmlFor="razonSocial">Razon social:</label>
          <input
            type="text"
            id="razonSocial"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
            className="form-control"
          />
          {errors.razonSocial && <p className="error">{errors.razonSocial}</p>}
        </div>
      )}
      {tipoDocumento === "cedula de ciudadania" && (
        <div>
          <div className="form-group">
            <label htmlFor="Nombre">Nombre:</label>
            <input
              type="text"
              id="Nombre"
              value={Nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control"
            />
            {errors.Nombre && <p className="error">{errors.Nombre}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="primerApellido">Primer apellido:</label>
            <input
              type="text"
              id="primerApellido"
              value={primerApellido}
              onChange={(e) => setPrimerApellido(e.target.value)}
              className="form-control"
            />
            {errors.primerApellido && <p className="error">{errors.primerApellido}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="segundoApellido">Segundo apellido:</label>
            <input
              type="text"
              id="segundoApellido"
              value={segundoApellido}
              onChange={(e) => setSegundoApellido(e.target.value)}
              className="form-control"
            />
            {errors.segundoApellido && <p className="error">{errors.segundoApellido}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="form-control"
            />
            {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento}</p>}
          </div>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="telefonoCelular">Número de celular:</label>
        <input
          type="text"
          id="telefonoCelular"
          value={telefonoCelular}
          onChange={(e) => setTelefonoCelular(e.target.value)}
          className="form-control"
        />
        {errors.telefonoCelular && <p className="error">{errors.telefonoCelular}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit" className="btn">
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
