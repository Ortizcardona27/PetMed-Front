import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [firstName, setFirstName] = useState(""); // nuevo campo para nombre
  const [lastName, setLastName] = useState(""); // nuevo campo para apellido
  const [birthDate, setBirthDate] = useState(""); // nuevo campo para fecha de nacimiento
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here
    if (documentType === "") {
      setErrors({ ...errors, documentType: "El tipo de documento es requerido." });
    }
    if (documentNumber === "") {
      setErrors({ ...errors, documentNumber: "El número de documento es requerido." });
    }
    if (cellPhone === "") {
      setErrors({ ...errors, cellPhone: "El número de celular es requerido." });
    }
    if (email === "") {
      setErrors({ ...errors, email: "El email es requerido." });
    }
    if (password === "") {
      setErrors({ ...errors, password: "La contraseña es requerida." });
    }
    if (documentType === "nit" && razonSocial === "") {
      setErrors({ ...errors, razonSocial: "La razón social es requerida." });
    }
    if (documentType === "cedula de ciudadania" && (firstName === "" || lastName === "" || birthDate === "")) {
      setErrors({ ...errors, firstName: "El nombre es requerido.", lastName: "El apellido es requerido.", birthDate: "La fecha de nacimiento es requerida." });
    }
    // If no errors, submit form here
  };

  return (
    <form onSubmit={handleSubmit} className="form blue">
      <div className="form-group">
        <label htmlFor="documentType">Tipo de documento:</label>
        <select
          id="documentType"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="form-control"
        >
          <option value="">Selecciona una opción</option>
          <option value="nit">NIT</option>
          <option value="cedula de ciudadania">Cédula de ciudadania</option>
        </select>
        {errors.documentType && <p className="error">{errors.documentType}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="documentNumber">Número de documento:</label>
        <input
          type="text"
          id="documentNumber"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          className="form-control"
        />
        {errors.documentNumber && (
          <p className="error">{errors.documentNumber}</p>
        )}
      </div>
      {documentType === "nit" && (
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
      {documentType === "cedula de ciudadania" && (
        <div>
          <div className="form-group">
            <label htmlFor="firstName">Nombre:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">Fecha de nacimiento:</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="form-control"
            />
            {errors.birthDate && <p className="error">{errors.birthDate}</p>}
          </div>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="cellPhone">Teléfono celular:</label>
        <input
          type="text"
          id="cellPhone"
          value={cellPhone}
          onChange={(e) => setCellPhone(e.target.value)}
          className="form-control"
        />
        {errors.cellPhone && <p className="error">{errors.cellPhone}</p>}
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
      <button type="submit" className="btn btn-primary">
        Registrarme
      </button>
    </form>
  );
};

export default RegisterForm;
