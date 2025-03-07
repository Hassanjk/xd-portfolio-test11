import React, { useEffect } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

interface AboutMeProps {
  onNavigateBack: () => void;
  onNavigateToContact: () => void;
}

const AboutMe = React.forwardRef<HTMLDivElement, AboutMeProps>(({ onNavigateBack, onNavigateToContact }, ref) => {
  useEffect(() => {
    // Add parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-parallax');
        const x = mouseX * parseInt(speed || '0');
        const y = mouseY * parseInt(speed || '0');
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    // Add scroll handler for transitioning to contact
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) { // Scrolling down
        onNavigateToContact();
      } else if (e.deltaY < 0) { // Scrolling up
        onNavigateBack();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [onNavigateToContact, onNavigateBack]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#131212] text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-[#2a2a2a] to-transparent rounded-full blur-3xl opacity-20" data-parallax="20" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-r from-[#3d3d3d] to-transparent rounded-full blur-3xl opacity-20" data-parallax="30" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title text-7xl md:text-8xl mb-12" data-parallax="10">
            About Me
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-8">
              <p className="hero-sub text-xl leading-relaxed text-gray-300" data-parallax="5">
                A passionate digital product designer focused on creating intuitive and impactful user experiences. With expertise in UI/UX design, interaction design, and front-end development.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold font-unbounded">Experience</h3>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <p className="font-semibold">Senior Product Designer</p>
                    <p className="text-sm">Company Name • 2020 - Present</p>
                  </div>
                  <div>
                    <p className="font-semibold">UI/UX Designer</p>
                    <p className="text-sm">Previous Company • 2018 - 2020</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold font-unbounded">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {['UI Design', 'UX Design', 'Prototyping', 'User Research', 'Figma', 'React', 'TypeScript', 'Motion Design'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-[#2a2a2a] rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold font-unbounded">Connect</h3>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-gray-300 transition-colors"><Github /></a>
                  <a href="#" className="hover:text-gray-300 transition-colors"><Linkedin /></a>
                  <a href="#" className="hover:text-gray-300 transition-colors"><Twitter /></a>
                  <a href="#" className="hover:text-gray-300 transition-colors"><Mail /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="absolute bottom-12 left-0 right-0 text-center" data-parallax="5">
        <p className="text-xl font-light italic text-gray-400">
          "Design is not just what it looks like and feels like. Design is how it works."
        </p>
      </div>
    </div>
  );
});

export default AboutMe;