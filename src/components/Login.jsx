
function LoginForm() {

  const onClic = () => {
    const url = 'http://localhost:8082/oauth2/authorize?response_type=code&client_id=users-petmed&redirect_uri=http://localhost:3000/iniciosesion&scope=openid%20profile';
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    const loginPopup = window.open(url, 'loginPopup', options);
  }

  return (
    <div className="form-container">

      <button onClick={onClic}>Iniciar sesión</button>

    </div>
  );
}

export default LoginForm;