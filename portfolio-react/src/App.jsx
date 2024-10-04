import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import './App.css'; // Optional, falls du eigenes CSS hinzufügst

function App() {
  return (
    <div>
      <Header />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
