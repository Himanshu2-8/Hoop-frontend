import { Users, Share2, Trophy, Play } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Users size={36} />,
    title: "Join the Community",
    description: "Sign up or log in to connect with players and teams near you.",
  },
  {
    id: 2,
    icon: <Share2 size={36} />,
    title: "Create or Join Games",
    description: "Start a match or join an ongoing one — basketball, football, or more.",
  },
  {
    id: 3,
    icon: <Play size={36} />,
    title: "Play Together",
    description: "Meet players, play matches, and enjoy live competition in real time.",
  },
  {
    id: 4,
    icon: <Trophy size={36} />,
    title: "Track & Improve",
    description: "View your performance stats, scores, and climb up the leaderboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 text-gray-800 bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-amber-600">
          It's Simple
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative p-8 rounded-2xl bg-white/80 border border-amber-200 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="p-5 rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-amber-600">
                {step.id}. {step.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;