import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FDF3E5] to-[#E9F4F4] flex flex-col items-center justify-center p-6 rounded-3xl shadow-xl shadow-amber-500">
      <header className="w-full max-w-4xl mb-8 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-amber-700 mb-2">Welcome back, Player!</h1>
        <p className="text-amber-600 text-lg">Get ready to jump into the action and track your progress.</p>
      </header>

      <section className="w-full max-w-4xl flex justify-center gap-6 mb-15">

        <Link to="/create" className="bg-amber-400 hover:bg-amber-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xl font-semibold">Create Game</span>
        </Link>

        <Link to="/matches" className="bg-amber-400 hover:bg-amber-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0h-8" />
          </svg>
          <span className="text-xl font-semibold">Join a Game</span>
        </Link>

        <Link to="/leaderboard" className="bg-amber-400 hover:bg-amber-500 text-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transition transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 14s1.5-2 4-2 4 2 4 2v5H8v-5zM12 12a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          <span className="text-xl font-semibold">Invite Friends</span>
        </Link>
      </section>

      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-amber-700 mb-6">Your Stats (Feature Coming Soon)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-amber-600">
          <div className="bg-amber-100 rounded-lg p-4 text-center">
            <p className="mt-1 font-medium">Games Played</p>
          </div>
          <div className="bg-amber-100 rounded-lg p-4 text-center">
            <p className="mt-1 font-medium">Wins</p>
          </div>
          <div className="bg-amber-100 rounded-lg p-4 text-center">
            <p className="mt-1 font-medium">Win Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
