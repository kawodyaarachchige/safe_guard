import React from 'react';
import { Lightbulb, ExternalLink } from 'lucide-react';

export default function SafetyTips() {
  const tips = [
    {
      title: "Stay Alert in Public",
      description: "Be aware of your surroundings. Avoid using headphones or phone while walking alone.",
      link: "#",
    },
    {
      title: "Share Your Location",
      description: "Always share your live location with trusted contacts when traveling.",
      link: "#",
    },
    {
      title: "Emergency Numbers",
      description: "Save important emergency numbers on speed dial.",
      link: "#",
    },
    {
      title: "Safe Routes",
      description: "Plan your route in advance and stick to well-lit, populated areas.",
      link: "#",
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Safety Tips</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="p-4 border rounded-lg hover:border-purple-300 transition-colors">
            <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
            <p className="text-gray-600 mb-2">{tip.description}</p>
            <a href={tip.link} className="text-purple-600 hover:text-purple-700 flex items-center space-x-1">
              <span>Learn more</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}