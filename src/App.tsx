import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import { Location } from './pages/Location';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/location" element={<Location />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;