const log_out = () => {
    this.localStorageService.remove('token');
    window.location.href = 'http://localhost:8082/logout';
}

function logout() {
    log_out();
    return (
      <div className="form-container">
        
      </div>
    );
  }
  
  export default logout;