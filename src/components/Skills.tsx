import React from 'react';
import { Code, PenTool, Database, Server } from 'lucide-react';

const skills = [
  { name: 'Front-end Development', icon: Code },
  { name: 'UI/UX Design', icon: PenTool },
  { name: 'Database Management', icon: Database },
  { name: 'Back-end Development', icon: Server },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <skill.icon size={48} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-center">{skill.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;