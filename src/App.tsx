import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import personImage from './assets/img/person.png';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import SingleProject from './pages/SingleProject';
import NavigationMenu from './components/NavigationMenu';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useScrollStore } from './store/useScrollStore';
import './styles/singleProject.css';

gsap.registerPlugin(Observer);

function AppContent() {
  const { currentView, setCurrentView, isAnimating, setIsAnimating } = useScrollStore();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const view1Ref = useRef<HTMLDivElement>(null);
  const view2Ref = useRef<HTMLDivElement>(null);
  const view3Ref = useRef<HTMLDivElement>(null);
  const view4Ref = useRef<HTMLDivElement>(null);
  const projectViewRef = useRef<HTMLDivElement>(null);

  const handleViewTransition = (direction: 'up' | 'down', targetView: number) => {
    if (isAnimating) return;
    
    // Prevent invalid transitions
    if (currentView === 1 && targetView !== 2) return;
    if (currentView === 2 && targetView !== 1 && targetView !== 3) return;
    if (currentView === 3 && targetView !== 2 && targetView !== 4) return;
    if (currentView === 4 && targetView !== 3) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => setIsAnimating(false)
    });

    if (currentView === 1 && targetView === 2) {
      // Home to Projects
      tl.to(view1Ref.current, { yPercent: -100 })
        .fromTo(view2Ref.current, 
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    } else if (currentView === 2 && targetView === 1) {
      // Projects to Home
      tl.to(view2Ref.current, { yPercent: 100 })
        .fromTo(view1Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(1));
    } else if (currentView === 2 && targetView === 3) {
      // Projects to About
      tl.to(view2Ref.current, { yPercent: -100 })
        .fromTo(view3Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    } else if (currentView === 3 && targetView === 2) {
      // About to Projects
      tl.to(view3Ref.current, { yPercent: 100 })
        .fromTo(view2Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    } else if (currentView === 3 && targetView === 4) {
      // About to Contact
      tl.to(view3Ref.current, { yPercent: -100 })
        .fromTo(view4Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(4));
    } else if (currentView === 4 && targetView === 3) {
      // Contact to About
      tl.to(view4Ref.current, { yPercent: 100 })
        .fromTo(view3Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    }
  };

  const handleProjectSelect = (projectId: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedProjectId(projectId);

    // Animate the project view in
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => setIsAnimating(false)
    });

    tl.set(projectViewRef.current, { visibility: 'visible', zIndex: 100 })
      .fromTo(projectViewRef.current, 
        { xPercent: 100 },
        { xPercent: 0 }
      );
  };

  const handleReturnFromProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => {
        setIsAnimating(false);
        setSelectedProjectId(null);
      }
    });

    tl.to(projectViewRef.current, { xPercent: 100 })
      .set(projectViewRef.current, { visibility: 'hidden', zIndex: -1 });
  };

  useEffect(() => {
    // Initial setup
    gsap.set([view1Ref.current, view2Ref.current, view3Ref.current, view4Ref.current], { 
      visibility: 'visible' 
    });
    gsap.set(view1Ref.current, { yPercent: currentView === 1 ? 0 : -100 });
    gsap.set(view2Ref.current, { yPercent: currentView === 2 ? 0 : 100 });
    gsap.set(view3Ref.current, { yPercent: currentView === 3 ? 0 : 100 });
    gsap.set(view4Ref.current, { yPercent: currentView === 4 ? 0 : 100 });

    // Observer for scroll transitions - only active when not on view 2 (Projects)
    const observer = Observer.create({
      target: window,
      type: 'wheel',
      onChange: (event) => {
        if (isAnimating || currentView === 2) return; // Prevent scroll transitions on view 2
        
        const scrollingDown = event.deltaY > 0;
        
        // Updated scroll transition logic
        if (scrollingDown && currentView === 1) {
          handleViewTransition('down', 2);
        } else if (!scrollingDown && currentView === 3) {
          handleViewTransition('up', 2);
        } else if (!scrollingDown && currentView === 4) {
          handleViewTransition('up', 3);
        }
      },
      preventDefault: true
    });

    return () => {
      if (observer) observer.kill();
    };
  }, [currentView, isAnimating]);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Views Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* View 1 - Home */}
        <div ref={view1Ref} className="view view--1">
          <div className="relative min-h-screen bg-black">
            {/* Header/Navigation */}
            <header className="absolute top-0 left-0 w-full z-10 px-12 py-6 flex justify-between items-center">
              <div className="logo flex items-center">
                <span className="text-white text-3xl font-bold">Cod</span>
                <span className="text-[#FF5C00] text-3xl font-bold">≡r</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-white hover:text-[#FF5C00] transition-colors bg-[#FF5C00] px-6 py-2">About Me</a>
                <a href="#services" className="text-white hover:text-[#FF5C00] transition-colors">Services</a>
                <a href="#portfolio" className="text-white hover:text-[#FF5C00] transition-colors">Portfolio</a>
                <a href="#testimonials" className="text-white hover:text-[#FF5C00] transition-colors">Testimonials</a>
                <a href="#blog" className="text-white hover:text-[#FF5C00] transition-colors">Blog</a>
                <a href="#contact" className="text-white hover:text-[#FF5C00] transition-colors">Contact Us</a>
                <a href="#hire" className="bg-[#FF5C00] text-white px-6 py-3 rounded-md hover:bg-[#e65200] transition-colors">Hire Me!</a>
              </nav>
            </header>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row h-screen">
              {/* Left Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 z-10">
                <div className="bg-[#FF5C00] text-white px-4 py-2 inline-block mb-4 w-max relative">
                  <span>Hello, I am</span>
                  <div className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-[#FF5C00] border-r-[10px] border-r-transparent bottom-[-10px] left-6"></div>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold mb-4 font-['Poppins']">Mr. John Weary</h1>
                <p className="text-xl text-gray-300 mb-8">A Professional Web Developer and UI/UX Designer.</p>
                <div className="flex space-x-4">
                  <a href="#download" className="bg-[#FF5C00] text-white px-8 py-4 rounded-md hover:bg-[#e65200] transition-colors font-medium">Download CV</a>
                  <a href="#work" className="border border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-black transition-colors font-medium">My Work</a>
                </div>
              </div>

              {/* Right Content - Image - Pushed down with padding-top */}
              <div className="w-full md:w-1/2 relative" style={{ paddingTop: "2.5rem" }}>
                <img 
                  src="/assets/img/person.png"
                  alt="John Weary"
                  className="w-full h-full object-cover"
                />
                {/* Geometric overlay removed */}
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
              <div className="w-10 h-16 border-2 border-[#FF5C00] rounded-full flex justify-center">
                <div className="w-2 h-2 bg-[#FF5C00] rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* View 2 */}
        <div ref={view2Ref} className="view view--2">
          <Projects 
            onNavigateBack={() => handleViewTransition('up', 1)}
            onNavigateToAbout={() => handleViewTransition('down', 3)}
            onSelectProject={handleProjectSelect}
          />
        </div>

        {/* View 3 */}
        <div ref={view3Ref} className="view view--3">
          <AboutMe 
            onNavigateBack={() => handleViewTransition('up', 2)}
            onNavigateToContact={() => handleViewTransition('down', 4)}
          />
        </div>

        {/* View 4 */}
        <div ref={view4Ref} className="view view--4">
          <Contact onNavigateBack={() => handleViewTransition('up', 3)} />
        </div>

        {/* Project Detail View */}
        <div 
          ref={projectViewRef} 
          className="view project-view"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            visibility: 'hidden',
            zIndex: -1
          }}
        >
          {selectedProjectId !== null && (
            <SingleProject 
              projectId={selectedProjectId}
              onNavigateBack={handleReturnFromProject}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;