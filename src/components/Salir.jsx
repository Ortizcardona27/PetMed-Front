const log_out = () => {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:8082/logout?client_id=users-petmed';
}

function Salir() {
    log_out();
    return (
        <div className="form-container">

        </div>
    );
}

export default Salir;