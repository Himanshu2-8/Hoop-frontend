import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-8">Dashboard</h1>
        <div className="space-y-4">
          <Link to="/create">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105">
              Create Game
            </button>
          </Link>
          <Link to="/join">
            <button className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105">
              Join Game
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
