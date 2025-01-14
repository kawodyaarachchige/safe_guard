import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Bell, Users, Heart } from 'lucide-react';

export default function HomePage() {
  return (
      <div className="space-y-16 py-8">
        <section className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-block mb-6">
            <Heart className="h-16 w-16 text-pink-500 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
            Your Safety, Our Priority
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join our community of empowered women. Stay connected, protected, and confident with our comprehensive safety platform.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
                to="/signup"
                className="button-gradient text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
                to="/about"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[
            {
              icon: Shield,
              title: "Instant SOS",
              description: "One-tap emergency alert system with immediate response.",
              color: "text-purple-500",
              gradient: "from-purple-500/10 to-purple-500/5"
            },
            {
              icon: MapPin,
              title: "Live Tracking",
              description: "Real-time location sharing with trusted contacts.",
              color: "text-pink-500",
              gradient: "from-pink-500/10 to-pink-500/5"
            },
            {
              icon: Bell,
              title: "Smart Alerts",
              description: "Get notified about safety concerns in your area.",
              color: "text-rose-500",
              gradient: "from-rose-500/10 to-rose-500/5"
            },
            {
              icon: Users,
              title: "Support Network",
              description: "Build your circle of trust for enhanced safety.",
              color: "text-purple-500",
              gradient: "from-purple-500/10 to-purple-500/5"
            }
          ].map((feature, index) => (
              <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 hover-lift"
              >
                <div className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-xl inline-block mb-4`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
          ))}
        </section>

        <section className="bg-white/50 backdrop-blur-sm py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Trusted by Thousands of Women
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "This app gives me confidence to travel alone.",
                  author: "Sarah M.",
                  role: "Student"
                },
                {
                  quote: "The emergency features are quick and reliable.",
                  author: "Emily R.",
                  role: "Professional"
                },
                {
                  quote: "A must-have for every woman's safety.",
                  author: "Lisa K.",
                  role: "Entrepreneur"
                }
              ].map((testimonial, index) => (
                  <div key={index} className="glass-effect rounded-xl p-6 hover-lift">
                    <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                    <p className="font-medium text-purple-600">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Ready to Feel Safer?</h2>
          <Link
              to="/signup"
              className="button-gradient inline-flex items-center text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Join Our Community
            <Heart className="h-5 w-5 ml-2" />
          </Link>
        </section>
      </div>
  );
}