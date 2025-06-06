"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, Code, GraduationCap, User, Github, Linkedin } from "lucide-react";

const sectionsData = [
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail },
];

// Define the Project interface
interface Project {
  id: number;
  name: string;
  html_url: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    certifications: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Use the Project interface to type the projects state
  const [projects, setProjects] = useState<Project[]>([]);

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
      const currentElement = sectionRefs[key as keyof typeof sectionRefs].current;
      if (currentElement) {
        observer.observe(currentElement);
      }
    }

    return () => {
      for (const key in sectionRefs) {
        const currentElement = sectionRefs[key as keyof typeof sectionRefs].current;
        if (currentElement) {
          observer.unobserve(currentElement);
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/rithic-k/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Could not fetch projects:", error);
      }
    };

    fetchProjects(); // initial fetch

    // Poll every 5 minutes (300000 ms)
    const interval = setInterval(fetchProjects, 300000);

    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="bg-portfolio-background text-portfolio-foreground min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="navbar-solid sticky top-0 z-50 border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center">
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
         <div className="flex flex-col items-center mb-4">
            <div className="rounded-full h-32 w-32 bg-muted mb-4">
              <img
                src="https://avatars.githubusercontent.com/u/114114740?v=4"
                alt="Rithic Krishna"
                className="rounded-full h-full w-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-semibold mb-4 uppercase">ABOUT
            </h2>
          </div>
            <h2 className="text-3xl font-semibold mb-4 uppercase"> Rithic Krishna </h2>
          <p className="text-lg">
            Currently pursuing my Bachelor's in Computer Science and Engineering at SRM Institute of Science and Technology, Kattankulathur, Chennai.
          </p>
        </section>


        {/* Projects Section */}
       <section id="projects" ref={sectionRefs.projects} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 uppercase">PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {projects.map((project) => (
              <div key={project.id} className="bg-card rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-xl">
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={sectionRefs.contact} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 uppercase">CONTACT</h2>
          <p>Email: rithickrishna.k@gmail.com</p>
          <p>Mobile: +919677255954</p>
          {/* Add social media links or a contact form here */}
             <div className="flex flex-col gap-2">
                <Button variant="default" className="bg-black text-white" asChild>
                  <a href="https://github.com/rithic-k" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github className="mr-2" />
                    GitHub
                  </a>
                </Button>
               <Button variant="default" className="bg-black text-white" asChild>
                  <a href="https://www.linkedin.com/in/rithic-krishna-928897315/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Linkedin className="mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-portfolio-background border-t border-border/40 p-4 text-center">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

