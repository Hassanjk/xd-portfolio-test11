import React, { useState, useEffect } from 'react';
import { useScrollStore } from '../store/useScrollStore';

interface NavigationMenuProps {
  onNavigate: (view: number) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ onNavigate }) => {
  const { currentView } = useScrollStore();
  const [menuVisible, setMenuVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleNavClick = (view: number) => {
    onNavigate(view);
  };

  const navItems = [
    { id: 1, label: 'Home' },
    { id: 2, label: 'Projects' },
    { id: 3, label: 'About' },
    { id: 4, label: 'Contact' },
  ];

  return (
    <>
      <div className={`menu-toggle ${!menuVisible ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
      </div>
      
      <nav className={`navigation-menu ${!menuVisible ? 'hidden' : ''} ${scrolled ? 'scrolled' : ''}`}>
        {navItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="nav-tooltip">{item.label}</span>
          </div>
        ))}
      </nav>
    </>
  );
};

export default NavigationMenu;