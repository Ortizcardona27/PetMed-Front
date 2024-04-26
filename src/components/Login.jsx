import React, { useState } from 'react';

function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    if (!form.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Form is valid, handle submission here');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <p>{errors.password}</p>}
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default LoginForm;