import React from 'react';
import { BookOpen, Brain, Camera, Database } from 'lucide-react';

const researchAreas = [
  { name: 'Natural Language Processing', icon: BookOpen },
  { name: 'Machine Learning', icon: Brain },
  { name: 'Computer Vision', icon: Camera },
  { name: 'Big Data Analytics', icon: Database },
];

const Research: React.FC = () => {
  return (
    <section id="research" className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Research Areas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {researchAreas.map((area, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <area.icon size={48} className="text-blue-800 mb-4" />
            <h3 className="text-xl font-semibold text-center">{area.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Research;