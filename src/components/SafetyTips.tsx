import React from 'react';
import { Lightbulb, ExternalLink, Phone, MapPin, Shield } from 'lucide-react';

export default function SafetyTips() {
  const tips = [
    {
      title: "Stay Alert in Public",
      description: "Be aware of your surroundings. Avoid using headphones or phone while walking alone. Keep your phone easily accessible.",
      link: "#",
      icon: <Shield className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Share Your Location",
      description: "Always share your live location with trusted contacts when traveling. Use location-sharing apps like WhatsApp or Google Maps.",
      link: "#",
      icon: <MapPin className="h-6 w-6 text-green-500" />
    },
    {
      title: "Emergency Numbers",
      description: "Save important emergency numbers like Police, Ambulance, Fire Department, and your local contacts on speed dial.",
      link: "tel:+94728893383",
      icon: <Phone className="h-6 w-6 text-red-500" />
    },

    {
      title: "Cybersecurity Awareness",
      description: "Avoid sharing personal information online. Use strong passwords and be cautious with public Wi-Fi.",
      link: "#",
      icon: <Shield className="h-6 w-6 text-blue-500" />
    }
  ];

  return (
      <div className="bg-white rounded-2xl hover-lift shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="h-6 w-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-teal-800">Safety Tips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
              <div
                  key={index}
                  className="p-4 border-l-4 rounded-lg hover:border-pink-300 transition-colors"
              >
                <div className="flex items-center space-x-2 mb-2">
                  {tip.icon}
                  <h3 className="font-semibold text-lg text-teal-800">{tip.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">{tip.description}</p>
                <a
                    href={tip.link}
                    className="text-purple-500 hover:text-purple-700 flex items-center space-x-1"
                >
                  <span>Learn more</span>
                  <ExternalLink className="h-4 w-4 text-purple-500" />
                </a>
              </div>
          ))}
        </div>
      </div>
  );
}
