'use client'; // Add this if using Next.js 13+ with app directory

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={`${styles.nav} nav-container`}>
            <Link href="/" className={styles.logo}>
              <Image 
                src="/the-web-wrench-logo.webp" 
                alt="The Web Wrench"
                width={150}
                height={40}
                priority
                className={styles.logoImage}
              />
              <span>The Web Wrench</span>
            </Link>
            
            <button 
              className={styles.menuToggle} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
              <li>
                <Link 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-orange transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="#testimonials" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-orange transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-orange transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="#lead-survey" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById('lead-survey')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-brand-orange transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li className={styles.desktopOnly}>
                <Link 
                  href="#final-cta" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={styles.ctaHeader}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Floating CTA for mobile */}
      <a 
        href="https://calendly.com/more-estimates/let-s-discuss-how-we-can-help-grow-your-business" 
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingCta}
      >
        📞 Get Your Free Consultation Now
      </a>
    </>
  );
};

export default Header;