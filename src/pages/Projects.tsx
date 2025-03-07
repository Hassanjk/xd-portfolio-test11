import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import { preloadFonts } from '../check-implement-same/js/utils';
import Cursor from '../check-implement-same/js/cursor';
import { ArrowUp, ArrowRight } from 'lucide-react'; // Update imports

interface ProjectsProps {
  onNavigateBack: () => void;
  onNavigateToAbout: () => void;
  onSelectProject: (projectId: number) => void; // Add this prop
}

const Projects = React.forwardRef<HTMLDivElement, ProjectsProps>(({ onNavigateBack, onNavigateToAbout, onSelectProject }, ref) => {
  const cursorRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    console.log('Initializing Projects component');
    document.body.classList.add('loading');

    const preloadImages = () => {
      return new Promise((resolve) => {
        console.log('Starting image preload');
        const images = document.querySelectorAll('.gallery__item-imginner');
        console.log('Number of images found:', images.length);
        
        imagesLoaded(images, { background: true }, (instance) => {
          console.log('Images loaded successfully:', instance.images.length);
          resolve(true);
        });
      });
    };

    const initializeScrollAndCursor = async () => {
      try {
        // Wait for both images and fonts to load
        await Promise.all([preloadImages(), preloadFonts()]);
        
        console.log('Initializing Locomotive Scroll');
        const scrollContainer = document.querySelector('[data-scroll-container]');
        console.log('Scroll container found:', scrollContainer !== null);
        
        scrollRef.current = new LocomotiveScroll({
          el: scrollContainer,
          smooth: true,
          direction: 'horizontal',
          multiplier: 0.9,
          lerp: 0.1,
          tablet: {
            smooth: true,
            direction: 'horizontal',
            horizontalGesture: true
          },
          smartphone: {
            smooth: true,
            direction: 'horizontal',
            horizontalGesture: true
          }
        });

        // Add scroll event for image effects and vertical transitions
        scrollRef.current.on('scroll', (obj: any) => {
          for (const key of Object.keys(obj.currentElements)) {
            const element = obj.currentElements[key];
            
            // Handle image inner effects
            if (element.el.classList.contains('gallery__item-imginner')) {
              const progress = element.progress;
              const saturateVal = progress < 0.5 ? 
                Math.max(0, Math.min(1, progress * 2)) : 
                Math.max(0, Math.min(1, (1 - progress) * 2));
              const brightnessVal = progress < 0.5 ? 
                Math.max(0, Math.min(1, progress * 2)) : 
                Math.max(0, Math.min(1, (1 - progress) * 2));
              element.el.style.filter = 
                `saturate(${saturateVal}) brightness(${brightnessVal})`;
            }
          }
        });

        // Force scroll update
        setTimeout(() => {
          scrollRef.current.update();
          console.log('Scroll updated');
        }, 1000);

        // Initialize custom cursor
        console.log('Initializing cursor');
        cursorRef.current = new Cursor(document.querySelector('.cursor'));

        // Mouse effects
        [...document.querySelectorAll('a,.gallery__item-img,.gallery__item-number')].forEach(link => {
          link.addEventListener('mouseenter', () => cursorRef.current?.enter());
          link.addEventListener('mouseleave', () => cursorRef.current?.leave());
        });

        document.body.classList.remove('loading');
        console.log('Initialization complete');

      } catch (error) {
        console.error('Error during initialization:', error);
        document.body.classList.remove('loading');
      }
    };

    initializeScrollAndCursor();

    return () => {
      if (scrollRef.current) {
        console.log('Destroying Locomotive Scroll');
        scrollRef.current.destroy();
      }
      document.body.classList.remove('loading');
    };
  }, []);

  const projectTitles = [
    'Funambulist', 'Omophagy', 'Conniption', 'Xenology', 
    'Lycanthropy', 'Mudlark', 'Illywhacker', 'Disenthral'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <main data-scroll-container className="h-full">
        <div className="content">
          <div className="gallery" id="gallery">
            {/* Replace the first gallery__text div with this */}
            <div className="navigation-container">
              <div className="back-arrow-container">
                <div 
                  onClick={onNavigateBack}
                  className="back-arrow"
                  data-scroll 
                  data-scroll-speed="-4" 
                  data-scroll-direction="vertical"
                >
                  <ArrowUp />
                  <div className="rotating-text">
                    <svg viewBox="0 0 100 100" width="100" height="100">
                      <defs>
                        <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                      </defs>
                      <text>
                        <textPath href="#circle">
                          back to main • back to main • 
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="scroll-indicator">
                <ArrowRight />
                <span>scroll to explore</span>
              </div>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => (
              <figure 
                key={num} 
                className="gallery__item" 
                data-scroll 
                data-scroll-speed={idx % 2 === 0 ? "2" : "-2"} 
                data-scroll-direction="vertical"
              >
                <div className="gallery__item-img">
                  <div 
                    className="gallery__item-imginner" 
                    data-scroll 
                    data-scroll-speed="1" 
                    data-scroll-direction="vertical"
                    style={{ 
                      backgroundImage: `url(src/assets/img/demo1/${num}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: '50% 25%'
                    }}
                  />
                </div>
                <figcaption className="gallery__item-caption">
                  <h2 
                    className="gallery__item-title" 
                    data-scroll 
                    data-scroll-speed={idx % 2 === 0 ? "1.5" : "-1.5"}
                    data-scroll-direction="vertical"
                  >
                    {projectTitles[num-1]}
                  </h2>
                  <span 
                    className="gallery__item-number"
                    data-scroll 
                    data-scroll-speed={idx % 2 === 0 ? "2" : "-2"}
                    data-scroll-direction="vertical"
                  >
                    {String(num).padStart(2, '0')}
                  </span>
                  <p className="gallery__item-tags">
                    <span>#design</span>
                    <span>#creative</span>
                    <span>#development</span>
                  </p>
                  <a 
                    className="gallery__item-link" 
                    onClick={() => onSelectProject(num)}
                    style={{ cursor: 'pointer' }}
                  >
                    explore
                  </a>
                </figcaption>
              </figure>
            ))}
            <div className="about-me-container">
              <div className="about-me-card"
                onClick={onNavigateToAbout}
                data-scroll 
                data-scroll-speed="2"
                data-scroll-direction="vertical"
              >
                <h3 className="about-me-title">About Me</h3>
                <p className="about-me-subtitle">Let's work together</p>
                <div className="about-me-circle">
                  <ArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <svg className="cursor" width="20" height="20" viewBox="0 0 20 20">
        <circle className="cursor__inner" cx="10" cy="10" r="5"/>
      </svg>
    </div>
  );
});

export default Projects;