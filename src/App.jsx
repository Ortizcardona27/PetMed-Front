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


function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/infoMascota" element={<ModalMascota />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="consultas/adopcionForm" element={<AdopcionForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerform" element={<RegisterForm />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path="/logout" element={<Salir />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
