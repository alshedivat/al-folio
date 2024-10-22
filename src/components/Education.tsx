import React from 'react';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    degree: 'Ph.D. in Computer Science',
    institution: 'Stanford University',
    year: '2015',
  },
  {
    degree: 'M.S. in Computer Science',
    institution: 'Massachusetts Institute of Technology',
    year: '2011',
  },
  {
    degree: 'B.S. in Computer Science',
    institution: 'University of California, Berkeley',
    year: '2009',
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start">
            <GraduationCap size={24} className="text-blue-800 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}, {edu.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;