import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import players from "../../public/players.png";

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-20 py-24 px-8
      bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4]
      rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 pointer-events-none"></div>

      <div className="max-w-xl text-center md:text-left">
        <div className="flex justify-center md:justify-start mb-3">
          <Button
            variant="outline"
            className="border-amber-600 rounded-3xl text-sm md:text-base px-4 py-2 font-medium"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
            10,000+ Active players connecting now
          </Button>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight text-gray-800 mb-2">
          Play.
        </h1>
        <h1 className="text-6xl md:text-7xl font-bold leading-tight text-amber-600 mb-2">
          Compete.
        </h1>
        <h1 className="text-6xl md:text-7xl font-bold leading-tight text-gray-800">
          Connect.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600">
          Welcome to <span className="text-amber-600 font-bold">Hoop</span> — the ultimate
          space for athletes, teams, and enthusiasts.
        </p>
        <p className="mt-1 text-lg md:text-xl text-gray-600">
          <span className="text-amber-600 font-bold">Find games, track stats,</span> and
          connect with players who share your passion.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <Link to={"/signin"}>
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:opacity-90 transition font-semibold shadow-md">
              Get Started
            </button>
          </Link>
          <Link to={"/community"}>
            <button className="px-8 py-3 bg-white text-gray-800 rounded-full shadow hover:shadow-lg transition font-semibold">
              Explore Community
            </button>
          </Link>
        </div>
      </div>

      <div className="relative w-full md:w-[600px] lg:w-[650px] py-10">
        <img
          src={players}
          alt="Players"
          className="w-full h-auto object-cover rounded-2xl shadow-md hidden md:block"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/20 via-transparent to-orange-100/10 rounded-2xl blur-2xl -z-10"></div>
      </div>
    </section>
  );
}