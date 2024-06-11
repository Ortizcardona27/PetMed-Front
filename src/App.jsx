import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
import Inicio from "./components/Inicio";
import InicioSesion from "./components/InicioSesion";
import Salir from "./components/Salir";
import ModalMascota from "./components/ModalMascota";
import Consultas from "./components/Consultas";
import AdopcionForm from "./components/AdopcionForm";
import Direccion from "./components/Direccion";
import ModalCita from "./components/ModalCita";
import RecuperarContraseña from "./components/RecuperarContraseña";
import CambiarContraseña from "./components/CambiarContraseña";


function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/infoMascota" element={<ModalMascota />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/adopcionForm" element={<AdopcionForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerform" element={<RegisterForm />} />
          <Route path="/recuperarcontraseña" element={<RecuperarContraseña />} />
          <Route path="/recuperacion" element={<CambiarContraseña />} />
          <Route path="/direccion" element={<Direccion />} />
          <Route path="/infoCita" element={<ModalCita />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path="/logout" element={<Salir />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
