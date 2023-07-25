import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Navbar from './components/Navbar';
import NavbarLoggedIn from './components/NavbarLoggedIn';
import SignUp from './pages/SignUp';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/calendar';
import RouteGuard from './privateRoute/RouteGuard';
import Logout from './components/logout';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="dashboard" element={<RouteGuard><Dashboard /></RouteGuard>} />
        <Route path="/calendar" element={<RouteGuard><Calendar /></RouteGuard>} />
      </Routes>
    </>
  );
}

export default App;