import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { Testimonials } from '../components/sections/Testimonials';
import { Pricing } from '../components/sections/Pricing';
import { FAQ } from '../components/sections/FAQ';

const Home = () => {
  return (
    <div className="min-h-screen bg-(--color-bg-deep) text-(--color-text-bright)">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
