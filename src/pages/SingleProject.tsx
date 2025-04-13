import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import { preloadFonts } from '../check-implement-same/js/utils';
import Cursor from '../check-implement-same/js/cursor';

interface SingleProjectProps {
  projectId: number;
  onNavigateBack: () => void;
}

const SingleProject: React.FC<SingleProjectProps> = ({ projectId, onNavigateBack }) => {
  const cursorRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);

  // Project data based on the project ID
  const projectData = {
    id: projectId,
    title: ['Funambulist', 'Omophagy', 'Conniption', 'Xenology', 
            'Lycanthropy', 'Mudlark', 'Illywhacker', 'Disenthral'][projectId - 1],
    description: "This project explores the intersection of digital art and interactive design. Through innovative approaches, it challenges conventional perspectives on how we interact with digital media.",
    year: `202${projectId}`,
    client: "Studio Digital",
    services: ["UX Design", "Development", "Branding"],
    mainImage: `/assets/img/demo1/${projectId}.jpg`,
    gallery: [
      `/assets/img/demo1/${projectId}.jpg`,
      `/assets/img/demo1/${projectId === 8 ? 1 : projectId + 1}.jpg`,
      `/assets/img/demo1/${projectId <= 2 ? 8 - (2 - projectId) : projectId - 2}.jpg`
    ]
  };

  useEffect(() => {
    document.body.classList.add('loading');

    const preloadImages = () => {
      return new Promise((resolve) => {
        const images = document.querySelectorAll('.project-image');
        imagesLoaded(images, { background: true }, () => {
          resolve(true);
        });
      });
    };

    const initializeScrollAndCursor = async () => {
      try {
        // Wait for both images and fonts to load
        await Promise.all([preloadImages(), preloadFonts()]);
        
        const scrollContainer = document.querySelector('[data-scroll-container]');
        
        scrollRef.current = new LocomotiveScroll({
          el: scrollContainer,
          smooth: true,
          multiplier: 1,
          lerp: 0.1
        });

        // Initialize custom cursor
        cursorRef.current = new Cursor(document.querySelector('.cursor'));

        // Mouse hover effects
        [...document.querySelectorAll('a, button, .project-link')].forEach(link => {
          link.addEventListener('mouseenter', () => cursorRef.current?.enter());
          link.addEventListener('mouseleave', () => cursorRef.current?.leave());
        });

        document.body.classList.remove('loading');

      } catch (error) {
        console.error('Error during initialization:', error);
        document.body.classList.remove('loading');
      }
    };

    initializeScrollAndCursor();

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
      document.body.classList.remove('loading');
    };
  }, [projectId]);

  return (
    <div className="single-project relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="fixed top-10 left-10 z-50">
        <button 
          onClick={onNavigateBack}
          className="back-button flex items-center gap-2 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft size={24} />
          <span>Back to Projects</span>
        </button>
      </div>

      <main data-scroll-container className="h-full">
        {/* Hero Section */}
        <section 
          className="hero-section h-screen relative flex items-center"
          data-scroll-section
        >
          <div 
            className="project-image absolute inset-0 z-0"
            style={{ 
              backgroundImage: `url(${projectData.mainImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)'
            }}
            data-scroll
            data-scroll-speed="-3"
          ></div>
          
          <div className="container mx-auto px-8 relative z-10">
            <div 
              className="max-w-2xl"
              data-scroll
              data-scroll-speed="2"
            >
              <h1 className="text-6xl font-bold mb-6">{projectData.title}</h1>
              <p className="text-xl text-white/80 mb-8">{projectData.description}</p>
              <div className="flex items-center gap-2 text-yellow-400">
                <ArrowRight size={20} />
                <span>Scroll to explore</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Info Section */}
        <section 
          className="project-info py-32 bg-zinc-900"
          data-scroll-section
        >
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="md:col-span-2">
                <h2 
                  className="text-3xl font-bold mb-8"
                  data-scroll
                  data-scroll-speed="1"
                >
                  About the Project
                </h2>
                <div 
                  className="space-y-6"
                  data-scroll
                  data-scroll-speed="0.5"
                >
                  <p className="text-lg text-white/80">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod 
                    metus ac neque pharetra, sit amet efficitur nisl tempus. Nulla facilisi. 
                    Praesent tincidunt libero vel facilisis efficitur.
                  </p>
                  <p className="text-lg text-white/80">
                    Sed vehicula, ipsum vel egestas pretium, velit lorem ultrices ex, 
                    eget luctus nibh sem et nisl. Cras at varius sem. Sed ut libero ac 
                    arcu ultricies venenatis ut at nulla.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-yellow-400 hover:underline">
                    <span>Visit live project</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div 
                className="project-meta border-l border-white/20 pl-8"
                data-scroll
                data-scroll-speed="1.5"
              >
                <div className="mb-8">
                  <h3 className="text-white/60 text-sm mb-2">Year</h3>
                  <p className="text-xl">{projectData.year}</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-white/60 text-sm mb-2">Client</h3>
                  <p className="text-xl">{projectData.client}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm mb-2">Services</h3>
                  <ul className="space-y-1">
                    {projectData.services.map((service, index) => (
                      <li key={index} className="text-lg">{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section 
          className="project-gallery py-32 bg-black"
          data-scroll-section
        >
          <div className="container mx-auto px-8">
            <h2 
              className="text-3xl font-bold mb-16"
              data-scroll
              data-scroll-speed="1"
            >
              Project Gallery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectData.gallery.map((image, index) => (
                <div 
                  key={index}
                  className="gallery-item"
                  data-scroll
                  data-scroll-speed={index % 2 ? "0.5" : "1.5"}
                >
                  <div 
                    className="project-image aspect-video w-full"
                    style={{ 
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Project Section */}
        <section 
          className="next-project-section py-32 bg-zinc-900"
          data-scroll-section
        >
          <div className="container mx-auto px-8 text-center">
            <h2 
              className="text-2xl mb-4 text-white/60"
              data-scroll
              data-scroll-speed="1"
            >
              Next Project
            </h2>
            <div 
              className="project-link cursor-pointer inline-flex items-center justify-center gap-4"
              onClick={onNavigateBack} // This would navigate to next project in a real implementation
              data-scroll
              data-scroll-speed="1"
            >
              <h3 className="text-5xl font-bold hover:text-yellow-400 transition-colors">
                {['Funambulist', 'Omophagy', 'Conniption', 'Xenology', 
                  'Lycanthropy', 'Mudlark', 'Illywhacker', 'Disenthral']
                  [projectId === 8 ? 0 : projectId]}
              </h3>
              <ArrowRight size={32} className="text-yellow-400" />
            </div>
          </div>
        </section>
      </main>

      <svg className="cursor" width="20" height="20" viewBox="0 0 20 20">
        <circle className="cursor__inner" cx="10" cy="10" r="5"/>
      </svg>
    </div>
  );
};

export default SingleProject;
