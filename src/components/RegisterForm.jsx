import React, { useState, useEffect } from "react";
import axios from "axios";


const RegisterForm = () => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [nroDocumento, setNroDocumento] = useState("");
  const [telefonoCelular, setTelefonoCelular] = useState("");
  const [telefonoFijo, setTelefonoFijo] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [Nombre, setNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errors, setErrors] = useState({});
  const [opciones, setOpciones] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (tipoDocumento === "") {
      formErrors.tipoDocumento = "El tipo de documento es requerido.";
    }
    if (nroDocumento === "") {
      formErrors.nroDocumento = "El número de documento es requerido.";
    }
    if (telefonoCelular === "") {
      formErrors.telefonoCelular = "El número de celular es requerido.";
    } else if (!/^[0-9]{10}$/.test(telefonoCelular)) {
      formErrors.telefonoCelular = "El número de celular debe tener 10 dígitos.";
    }
    if (telefonoFijo !== '') {
      if (telefonoFijo.length > 10) {
        formErrors.telefonoFijo = "El teléfono fijo no debe tener más de 10 digitos";
      }
      if (!/^[0-9]+$/.test(telefonoFijo)) {
        formErrors.telefonoFijo = "El teléfono fijo no tiene un formato válido";
      }
    }
    if (email === "") {
      formErrors.email = "El email es requerido.";
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      formErrors.email = "El email debe ser válido.";
    }
    if (password === "") {
      formErrors.password = "La contraseña es requerida.";
    }
    if (isNITSelected && razonSocial === "") {
      formErrors.razonSocial = "La razón social es requerida.";
    }
    if (!isNITSelected) {
      if (Nombre === "") {
        formErrors.Nombre = "El nombre es requerido.";
      }
      if (primerApellido === "") {
        formErrors.primerApellido = "El primer apellido es requerido.";
      }
      if (segundoApellido === "") {
        formErrors.segundoApellido = "El segundo apellido es requerido.";
      }
      if (fechaNacimiento === "") {
        formErrors.fechaNacimiento = "La fecha de nacimiento es requerida.";
      }
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      alert("Enviando formulario.")
      
      const payload = {
        nroDocumento: nroDocumento,
        tipoDocumento: Number(tipoDocumento),
        telefonoCelular: telefonoCelular,
        correo: email,
        contrasena: password,
      };

      if(telefonoFijo !== '') {
        payload.telefonoFijo = telefonoFijo;
      }

      if (isNITSelected) {
        payload.personaJuridica = {
          razonSocial: razonSocial
        };
      } else {
        payload.personaNatural = {
          primerNombre: Nombre,
          primerApellido: primerApellido,
          segundoApellido: segundoApellido,
          fechaNacimiento: fechaNacimiento + ' 00:00:00'
        };
        if (segundoNombre !== '') {
          payload.personaNatural.segundoNombre = segundoNombre
        }
      }
      
      axios.post('/api/usuarios/usuario/nuevo', payload)
        .then(response => {
          alert(response.data.respuesta);
          clearFormFields();
        })
        .catch(error => {
          console.log(error);
          if(error.response && error.response.status !== 400) {
            alert(error.response.data.respuesta);
          } 
          else {
            alert('Hay un error');
          }
        });
    }
  };

  useEffect(() => {
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
        setOpciones(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleTipoDocumentoChange = (event) => {
    setTipoDocumento(event.target.value);
  };

  const clearFormFields = () => {
    setTipoDocumento('');
    setNroDocumento('');
    setTelefonoCelular('');
    setTelefonoFijo('');
    setEmail('');
    setPassword('');
    setNombre('');
    setSegundoNombre('');
    setPrimerApellido('');
    setSegundoApellido('');
    setFechaNacimiento('');
    setRazonSocial('');
    setErrors({});
  };

  const isNITSelected =
    tipoDocumento ===
    String(opciones.find((opcion) => opcion.documento === "NIT")?.id);


  return (
    <form onSubmit={handleSubmit} className="form blue">
      <div className="form-group">
        <label htmlFor="tipoDocumento">Tipo de documento:</label>
        <select
          id="tipoDocumento"
          value={tipoDocumento}
          onChange={handleTipoDocumentoChange}
          className="form-control"
        >
          <option value="" disabled>Seleccione un tipo de documento</option>
          {opciones.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.documento}
            </option>
          ))}
        </select>
        {errors.tipoDocumento && (
          <p className="error">{errors.tipoDocumento}</p>
        )}
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
        {errors.nroDocumento && <p className="error">{errors.nroDocumento}</p>}
      </div>
      {(isNITSelected && tipoDocumento !== '') && (
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
      {(!isNITSelected && tipoDocumento !== '') && (
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
            <label htmlFor="segundoNombre">Segundo Nombre:</label>
            <input
              type="text"
              id="segundoNombre"
              value={segundoNombre}
              onChange={(e) => setSegundoNombre(e.target.value)}
              className="form-control"
            />
            {errors.segundoNombre && <p className="error">{errors.segundoNombre}</p>}
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
            {errors.primerApellido && (
              <p className="error">{errors.primerApellido}</p>
            )}
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
            {errors.segundoApellido && (
              <p className="error">{errors.segundoApellido}</p>
            )}
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
            {errors.fechaNacimiento && (
              <p className="error">{errors.fechaNacimiento}</p>
            )}
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
        {errors.telefonoCelular && (
          <p className="error">{errors.telefonoCelular}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="telefonoFijo">Número de teléfono:</label>
        <input
          type="text"
          id="telefonoFijo"
          value={telefonoFijo}
          onChange={(e) => setTelefonoFijo(e.target.value)}
          className="form-control"
        />
        {errors.telefonoFijo && (
          <p className="error">{errors.telefonoFijo}</p>
        )}
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
