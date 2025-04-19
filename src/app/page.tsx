"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, Code, GraduationCap, User, Github } from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const sectionsData = [
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50px 0px -50px 0px', // Adjust as needed for better UX
        threshold: 0.5, // Adjust to trigger when 50% of the section is visible
      }
    );

    for (const key in sectionRefs) {
      if (sectionRefs[key].current) {
        observer.observe(sectionRefs[key].current);
      }
    }

    return () => {
      for (const key in sectionRefs) {
        if (sectionRefs[key].current) {
          observer.unobserve(sectionRefs[key].current);
        }
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    sectionRefs[id as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="bg-portfolio-background text-portfolio-foreground min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-portfolio-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex space-x-4">
            {sectionsData.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className={cn(
                  'navbar-button text-lg px-6 py-4 font-extrabold uppercase whitespace-nowrap',
                  activeSection === section.id ? 'active' : '',
                  'text-portfolio-foreground hover:text-portfolio-accent transition-colors duration-200'
                )}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8">
        {/* About Section */}
        <section id="about" ref={sectionRefs.about} className="mb-16">
         <div className="flex items-center mb-4">
            <Avatar className="mr-4">
              <AvatarImage src="https://github.com/rithic-k.png" alt="Rithic Krishna" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-semibold mb-4 uppercase">About Me</h2>
            </div>
          </div>
          <p className="text-lg">
            I am a passionate and driven individual with a strong foundation in computer science and a keen interest in cloud computing and AI. With experience in developing and deploying applications on various platforms, I am eager to contribute my skills to innovative projects.
          </p>
        </section>


        {/* Projects Section */}
        <section id="projects" ref={sectionRefs.projects} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 uppercase">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example Project Cards - Replace with your actual projects */}
            <div className="bg-card rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-xl">Project 1</h3>
              <p>A brief description of the project and your role in it.</p>
            </div>
            <div className="bg-card rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-xl">Project 2</h3>
              <p>A brief description of the project and your role in it.</p>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" ref={sectionRefs.certifications} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 uppercase">Certifications</h2>
          <ul className="list-disc list-inside">
            {/* Example Certifications - Replace with your actual certifications */}
            <li>Certification 1 - Issuing Authority</li>
            <li>Certification 2 - Issuing Authority</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={sectionRefs.contact} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 uppercase">Contact Me</h2>
          <p>Feel free to reach out to me via email or connect with me on social media.</p>
          <p>Email: rithickrishna.k@gmail.com</p>
          <p>Mobile: +919677255954</p>
          {/* Add social media links or a contact form here */}
             <Button variant="ghost" className="navbar-button" asChild>
              <a href="https://github.com/rithic-k" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2" />
                GitHub
              </a>
            </Button>
                         <Button variant="ghost" className="navbar-button" asChild>
              <a href="https://www.linkedin.com/in/rithic-krishna-928897315/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                LinkedIn
              </a>
            </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-portfolio-background border-t border-border/40 p-4 text-center">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
