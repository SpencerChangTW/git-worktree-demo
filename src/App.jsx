import { useEffect } from 'react';
import useTheme from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="app" data-theme={theme}>
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            <main>
                <Hero />
                <SocialProof />
                <Features />
                <UseCases />
                <Pricing />
                <FAQ />
                <CallToAction />
            </main>
            <Footer />
            <CookieConsent />
        </div>
    );
}

export default App;
