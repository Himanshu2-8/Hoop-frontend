import React from "react";
import { Users, Share2, Gamepad2, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Users size={36} />,
    title: "Create a Room",
    description: "Tap “Start a Quiz” to instantly create a new quiz room.",
  },
  {
    id: 2,
    icon: <Share2 size={36} />,
    title: "Share the Code",
    description: "Send your unique room code to your friends to join the fun.",
  },
  {
    id: 3,
    icon: <Gamepad2 size={36} />,
    title: "Join the Room",
    description: "Enter the code, join your friends, and get ready to play.",
  },
  {
    id: 4,
    icon: <Rocket size={36} />,
    title: "Play & Compete",
    description: "The quiz starts live! Answer fast, score high, and climb the leaderboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          How <span className="text-teal-500">Hoop</span> Works
        </h2>
        <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
          Getting started takes seconds — create a room, invite friends, and let the live quiz begin!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="p-5 rounded-full bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20 group-hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-teal-500">
                {step.id}. {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
