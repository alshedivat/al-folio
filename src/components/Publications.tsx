import React from 'react';
import { ExternalLink } from 'lucide-react';

const publications = [
  {
    title: 'Deep Learning Approaches for Natural Language Understanding',
    journal: 'Journal of Artificial Intelligence Research',
    year: 2023,
    link: '#',
  },
  {
    title: 'A Novel Algorithm for Real-time Object Detection in Autonomous Vehicles',
    journal: 'IEEE Transactions on Intelligent Transportation Systems',
    year: 2022,
    link: '#',
  },
  {
    title: 'Improving Sentiment Analysis with Contextual Embeddings',
    journal: 'Proceedings of the ACL Conference',
    year: 2021,
    link: '#',
  },
];

const Publications: React.FC = () => {
  return (
    <section id="publications" className="my-16">
      <h2 className="text-3xl font-bold text-center mb-8">Selected Publications</h2>
      <div className="space-y-6">
        {publications.map((pub, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{pub.title}</h3>
            <p className="text-gray-600 mb-2">{pub.journal}, {pub.year}</p>
            <a
              href={pub.link}
              className="inline-flex items-center text-blue-800 hover:text-blue-600"
            >
              View Publication <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;