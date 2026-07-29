import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Solutions from './components/WhyChooseSkillNex';
import WhatWeDo from './components/How we train';
import Founder from './components/About Skillnex';
import TrainingProcess from './components/TrainingProcess';
import WhatWeProvide from './components/WhatWeProvide';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhyChooseSkillNex from './components/WhyChooseSkillNex';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <WhyChooseSkillNex />
        <WhatWeDo />
        <Founder />
        <TrainingProcess />
        <WhatWeProvide />
        <Portfolio />
        <Reviews />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
