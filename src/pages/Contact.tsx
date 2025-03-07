import React, { useEffect } from 'react';
import { Mail, MapPin, Phone, Send, Linkedin, Github, Twitter } from 'lucide-react';

interface ContactProps {
  onNavigateBack: () => void;
}

const Contact = React.forwardRef<HTMLDivElement, ContactProps>(({ onNavigateBack }, ref) => {
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#131212] text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-[#2a2a2a] to-transparent rounded-full blur-3xl opacity-20" data-parallax="20" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#3d3d3d] to-transparent rounded-full blur-3xl opacity-20" data-parallax="30" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pl-32 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="hero-title text-7xl md:text-8xl mb-8" data-parallax="10">
            Let's Connect
          </h1>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="relative group">
                  <input type="text" className="w-full bg-transparent border-b border-gray-700 py-4 focus:outline-none focus:border-white transition-colors" placeholder="Your Name" />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="relative group">
                  <input type="email" className="w-full bg-transparent border-b border-gray-700 py-4 focus:outline-none focus:border-white transition-colors" placeholder="Your Email" />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></div>
                </div>
                <div className="relative group">
                  <textarea className="w-full bg-transparent border-b border-gray-700 py-4 focus:outline-none focus:border-white transition-colors resize-none" rows={4} placeholder="Your Message"></textarea>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>

              <button className="flex items-center gap-2 px-8 py-4 bg-[#2a2a2a] hover:bg-[#3d3d3d] transition-colors rounded-full group">
                Send Message
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8" data-parallax="5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Location</h3>
                    <p className="text-gray-400">San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-400">hello@example.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4" data-parallax="3">
                <h3 className="text-2xl font-semibold">Follow Me</h3>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-gray-300 transition-colors"><Github /></a>
                  <a href="#" className="hover:text-gray-300 transition-colors"><Linkedin /></a>
                  <a href="#" className="hover:text-gray-300 transition-colors"><Twitter /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Contact;
