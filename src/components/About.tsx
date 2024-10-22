import React from 'react';
import { User } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="my-16">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-800 rounded-full p-4">
            <User size={48} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">About Me</h2>
        <p className="text-gray-700 text-center max-w-2xl mx-auto">
          I am an Associate Professor of Computer Science at [University Name], specializing in 
          Artificial Intelligence and Machine Learning. My research focuses on developing novel 
          algorithms for natural language processing and computer vision. With over 10 years of 
          academic experience, I am passionate about pushing the boundaries of AI and mentoring 
          the next generation of computer scientists.
        </p>
      </div>
    </section>
  );
};

export default About;