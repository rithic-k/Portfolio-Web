"use client";

import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, Code, GraduationCap, User, Github } from "lucide-react";

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

  const [projects, setProjects] = useState([]);

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

    fetchProjects();
  }, []);

    const certificationsData = [
       {
      name: "Microsoft Certified: Azure Fundamentals",
      issuingOrganization: "Microsoft",
      credentialUrl: "https://www.credly.com/badges/6e1a5df7-d937-4e91-a20a-95494cd623ff/public_url"
    },
    {
      name: "Google Cloud Certified - Cloud Digital Leader",
      issuingOrganization: "Google Cloud",
      credentialUrl: "https://www.credential.net/9e6ef039-0f9c-4917-9287-c446a18e509e"
    },
    {
      name: "AWS Certified Cloud Practitioner",
      issuingOrganization: "Amazon Web Services (AWS)",
      credentialUrl: "https://www.credly.com/badges/9e492459-c1c1-49f2-b548-b8ac86250012/public_url"
    },
   {
      name: "Architecting with Google Compute Engine",
      issuingOrganization: "Coursera",
      credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/763G8XG486HR"
    },
        {
      name: "Networking in Google Cloud Specialization",
      issuingOrganization: "Coursera",
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/YYG2EADTZR9H"
    },
            {
      name: "Security in Google Cloud Specialization",
      issuingOrganization: "Coursera",
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/HSV9D55XCCAN"
    },
    {
      name: "Data Engineering on Google Cloud Platform Specialization",
      issuingOrganization: "Coursera",
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/5QKF4FTCZ7HA"
    },
    {
      name: "Preparing for Google Cloud Certification: Cloud Architect Professional Certificate",
      issuingOrganization: "Coursera",
      credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/QWERTYUIOP"
    },
        {
      name: "Google Cloud Fundamentals: Core Infrastructure",
      issuingOrganization: "Coursera",
      credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/R2LQG2G82F2S"
    },
            {
      name: "Elastic Kubernetes Service (EKS) with Terraform",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-ec14e7d2-1f56-447a-9cae-b01c99906a4e/"
    },
            {
      name: "AWS Certified Solutions Architect – Associate SAA-C03",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-6c285737-8c41-472f-a491-4b04e6ee1f29/"
    },
        {
      name: "Terraform on AWS",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-d7614c4e-4c19-4a8e-bb4d-f2efef952308/"
    },
        {
      name: "Amazon VPC MasterClass",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-f3ac1164-b905-459f-9f72-c8b860b1419f/"
    },
         {
      name: "Docker on AWS",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-468459e3-9960-4587-8847-f7ff95c7899a/"
    },
             {
      name: "AWS Certified Developer – Associate DVA-C02",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-cc9849b1-9943-4273-a703-94519c292a5c/"
    },
    {
      name: "AWS Certified SysOps Administrator – Associate SOA-C02",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-415c196f-275a-4543-84a9-959e66e6c9c2/"
    },
     {
      name: "AWS Certified DevOps Engineer – Professional DOP-C01",
      issuingOrganization: "Udemy",
      credentialUrl: "https://www.udemy.com/certificate/UC-79528dd2-ea92-4322-a941-52f3c8ee7769/"
    },
  ];

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
         <div className="flex flex-col items-center mb-4">
            <div className="rounded-full h-32 w-32 bg-muted mb-4">
              {/* Placeholder for Profile Picture */}
            </div>
            <h2 className="text-3xl font-semibold mb-4 uppercase">About Me</h2>
          </div>
          <p className="text-lg">
            I am a passionate and driven individual with a strong foundation in computer science and a keen interest in cloud computing and AI. With experience in developing and deploying applications on various platforms, I am eager to contribute my skills to innovative projects.
          </p>
        </section>


        {/* Projects Section */}
       <section id="projects" ref={sectionRefs.projects} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 uppercase">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-card rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-xl">
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                </h3>
                <p>{project.description || 'No description provided.'}</p>
                <p>
                  Language: {project.language || 'Not specified'}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* Certifications Section */}
        <section id="certifications" ref={sectionRefs.certifications} className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 uppercase">Certifications</h2>
            <ul className="list-disc list-inside">
              {certificationsData.map((cert, index) => (
                 <li key={index}>
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                       {cert.name} - {cert.issuingOrganization}
                    </a>
                 </li>
              ))}
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
