import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Bell, Users, Lightbulb } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="space-y-16 py-8">
            {/* Introduction Section */}
            <section className="text-center max-w-4xl mx-auto px-4">
                <div className="inline-block mb-6">
                    <Lightbulb className="h-16 w-16 text-yellow-500 animate-pulse" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
                    Stay Safe, Stay Empowered
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Safety starts with awareness. Learn practical ways to protect yourself and how our platform helps you stay safe in any situation.
                </p>
            </section>

            {/* Safety Tips Section */}
            <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    {
                        icon: Shield,
                        title: "Be Aware of Your Surroundings",
                        description: "Always stay alert, especially in unfamiliar areas. Our live tracking feature ensures someone you trust knows your location.",
                    },
                    {
                        icon: MapPin,
                        title: "Share Your Location",
                        description: "Let loved ones track your journey in real-time using our app. It's quick, easy, and keeps everyone reassured.",
                    },
                    {
                        icon: Bell,
                        title: "Stay Informed",
                        description: "Get instant alerts about any safety concerns in your vicinity, including weather warnings and local advisories.",
                    },
                    {
                        icon: Users,
                        title: "Build a Support Network",
                        description: "Create a trusted circle of friends and family to contact in case of emergencies. They’re just a tap away.",
                    }
                ].map((tip, index) => (
                    <div
                        key={index}
                        className="glass-effect rounded-2xl p-6 hover-lift"
                    >
                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-xl inline-block mb-4">
                            <tip.icon className="h-8 w-8 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                        <p className="text-gray-600">{tip.description}</p>
                    </div>
                ))}
            </section>

            {/* How the Platform Helps Section */}
            <section className="bg-white/50 backdrop-blur-sm py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        How Our Platform Keeps You Safe
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Emergency Alerts",
                                description: "Send an SOS alert to your trusted contacts instantly, complete with your location and an optional voice message.",
                            },
                            {
                                title: "Live Tracking",
                                description: "Enable real-time tracking when traveling alone or in new places. Share your journey with people you trust.",
                            },
                            {
                                title: "Smart Notifications",
                                description: "Receive updates on weather conditions, road safety, and potential risks nearby.",
                            },
                            {
                                title: "Secure and Private",
                                description: "Your data is encrypted and never shared without your consent. Safety and privacy go hand in hand.",
                            },
                        ].map((feature, index) => (
                            <div key={index} className="glass-effect rounded-xl p-6 hover-lift">
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="text-center px-4">
                <h2 className="text-3xl font-bold mb-8">Take Control of Your Safety</h2>
                <p className="text-gray-600 mb-6">
                    Start your journey to a safer life with our platform. Empower yourself and your loved ones today.
                </p>
                <Link
                    to="/signup"
                    className="button-gradient inline-flex items-center text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    Join Now
                    <Lightbulb className="h-5 w-5 ml-2" />
                </Link>
            </section>
        </div>
    );
}
