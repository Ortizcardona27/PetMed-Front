import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Inicio from "./components/Inicio";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerform" element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
