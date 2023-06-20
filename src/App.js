import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Landing from './Landing';
import Contact from './Contact';
import FAQ from './FAQ';
import Navbar from './Navbar';

function App() {
  let component;

  switch (window.location.pathname){
    case "/":
      component = <Landing/>
      break;
    case "Contact":
      component = <Contact/>
      break;
    case "FAQ":
      component = <FAQ/>
      break;
  }
  
  return (
    <>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    
    </>
  );
}

export default App;
