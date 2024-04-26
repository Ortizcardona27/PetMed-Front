import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';


function App() {

    return (
      <div>
          <BrowserRouter>
            <Navbar />
  
            <Routes>
            <Route path="/login" element={<Login />} />

            </Routes>
  
          </BrowserRouter>
      </div>
    );
  }
  
  export default App; 
  