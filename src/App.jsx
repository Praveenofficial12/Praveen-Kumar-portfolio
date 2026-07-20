import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Internship from './components/Internship';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

const pageVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => setLoading(false);

  return (
    <div className="min-h-screen bg-dark-950">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }}>
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            variants={pageVariants}
            initial="hidden"
            animate="show"
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Certifications />
              <Internship />
              <Resume />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
