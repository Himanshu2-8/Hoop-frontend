import { Users, Zap, Globe } from "lucide-react";
import { motion } from "motion/react";
import type { ReactElement } from "react";

interface Feature {
  icon: ReactElement;
  title: string;
  description: string;
  color: string;
}

interface Step {
  step: string;
  title: string;
  desc: string;
}

export default function Home(): ReactElement {
  const features: Feature[] = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Battles",
      description:
        "Compete head-to-head with instant score updates and live gameplay",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Easy Room Sharing",
      description:
        "Generate a unique code and invite friends to join your quiz room",
      color: "from-teal-400 to-cyan-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Dynamic Questions",
      description:
        "Fresh NBA trivia pulled from a vast database of basketball knowledge",
      color: "from-emerald-400 to-green-500",
    },
  ];

  const steps: Step[] = [
    {
      step: "1",
      title: "Create Room",
      desc: "Log in and start a new game session",
    },
    {
      step: "2",
      title: "Share Code",
      desc: "Send the room code to your friend",
    },
    {
      step: "3",
      title: "Battle Time",
      desc: "Answer NBA questions simultaneously",
    },
    {
      step: "4",
      title: "Crown Winner",
      desc: "Highest score takes the victory!",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                Challenge Your Friends
              </span>
              <br />
              <span className="text-gray-800">Hoop Showdown</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Test your basketball knowledge in real-time battles. Create a
              room, share the code, and see who's the ultimate NBA expert!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Playing Now
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/90 backdrop-blur-sm text-teal-700 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                How It Works
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {features.map((feature: Feature, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/50"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((item: Step, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-8 px-8 text-center text-gray-600">
        <p className="text-sm">
          Built with React, TypeScript, Express, Socket.IO & PostgreSQL
        </p>
      </footer>
    </div>
  );
}
