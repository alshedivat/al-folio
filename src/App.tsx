import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Research from './components/Research';
import Publications from './components/Publications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <About />
        <Research />
        <Publications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;