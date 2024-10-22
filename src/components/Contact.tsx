import React from 'react';
import { Mail, BookOpen, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <p className="text-center mb-6">
          I'm always open to research collaborations and speaking opportunities. Feel free to reach out!
        </p>
        <div className="flex justify-center space-x-6">
          <a href="mailto:your.email@university.edu" className="text-blue-800 hover:text-blue-600">
            <Mail size={24} />
          </a>
          <a href="https://scholar.google.com/youraccount" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-600">
            <BookOpen size={24} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-600">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;