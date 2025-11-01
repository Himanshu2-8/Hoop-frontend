import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import socket from "@/socket";

type GameState = "waiting" | "ready" | "playing" | "finished";

interface Question {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

interface Room {
  code: string;
  id: string;
  player1Id: string | null;
  player2Id: string | null;
  createdAt: Date;
  status: string;
}

const GameRoom = () => {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [isHost, setIsHost] = useState<boolean | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const { code } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      userId = JSON.parse(atob(token.split(".")[1])).id;
    } catch (e) {
      console.log("error", e);
    }
  }
  useEffect(() => {
    if (!userId || !token) {
      navigate("/signin");
    }
  }, [token, userId, navigate]);

  useEffect(() => {
    if (!token || !userId) {
      return;
    }

    socket.on("waiting", (data: { message: string }) => {
      console.log("Waiting for opponent...", data.message);
      setGameState("waiting");
    });

    socket.on("room_ready", (data: { room: Room }) => {
      console.log("Room ready:", data);
      setRoomData(data.room);
      setIsHost(data.room.player1Id === userId);
      setGameState("ready");
    });

    socket.on(
      "game_started",
      (data: {
        question: Question;
        questionNumber: number;
        player1Score: number;
        player2Score: number;
      }) => {
        console.log("Game started:", data);
        setQuestion(data.question);
        setQuestionNumber(data.questionNumber);
        setPlayer1Score(data.player1Score);
        setPlayer2Score(data.player2Score);
        setGameState("playing");
        setHasAnswered(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setCorrectAnswer(null);
      }
    );

    socket.on("answered", (data: { isCorrect: boolean; correctAnswer: string }) => {
      console.log("Answer result:", data);
      setIsCorrect(data.isCorrect);
      setCorrectAnswer(data.correctAnswer);
    });

    socket.on(
      "scores_updated",
      (data: { player1Score: number; player2Score: number }) => {
        console.log("Scores updated:", data);
        setPlayer1Score(data.player1Score);
        setPlayer2Score(data.player2Score);
      }
    );

    socket.on(
      "next_question",
      (data: {
        question: Question;
        questionNumber: number;
        totalQuestions: number;
      }) => {
        console.log("Next question:", data);
        setQuestion(data.question);
        setQuestionNumber(data.questionNumber);
        setTotalQuestions(data.totalQuestions);
        setHasAnswered(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setCorrectAnswer(null);
      }
    );

    socket.on(
      "game_over",
      (data: {
        player1Score: number;
        player2Score: number;
        winner: string;
      }) => {
        console.log("Game over:", data);
        setPlayer1Score(data.player1Score);
        setPlayer2Score(data.player2Score);
        setWinner(data.winner);
        setGameState("finished");
      }
    );

    socket.on("error", (err: { message?: string }) => {
      alert(err.message || "Something went wrong");
    });

    return () => {
      socket.off("waiting");
      socket.off("roomReady");
      socket.off("game_started");
      socket.off("answered");
      socket.off("scores_updates");
      socket.off("next_question");
      socket.off("game_over");
      socket.off("error");
    };
  }, [token, userId, navigate]);

  const handleGameStart = (): void => {
    socket.emit("game_start", { code });
  };

  const handleAnswerSubmit = (answer: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
    setHasAnswered(true);
    socket.emit("submit_answer", { code, answer, userId });
  };

  if (gameState === "waiting") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-8">Waiting for Opponent</h1>
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600">Room Code:</p>
          <p className="text-4xl font-mono font-bold text-green-600">{code}</p>
        </div>
      </div>
    );
  }

  if (gameState === "ready") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-8">Room Ready!</h1>
          <p className="text-lg text-gray-600 mb-8">Both players are connected. The host can now start the game.</p>
          {isHost ? (
            <button
              onClick={handleGameStart}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105"
            >
              Start Game
            </button>
          ) : (
            <p className="text-lg text-gray-600">Waiting for the host to start the game...</p>
          )}
        </div>
      </div>
    );
  }

  if (gameState === "playing" && question) {
    const allAnswers = [...question.incorrectAnswers, question.correctAnswer].sort();
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex justify-between items-center">
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600">Player 1</p>
              <p className="text-3xl font-bold text-blue-600">{player1Score}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600">Question</p>
              <p className="text-2xl font-bold text-gray-800">
                {questionNumber} / {totalQuestions || 10}
              </p>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600">Player 2</p>
              <p className="text-3xl font-bold text-purple-600">{player2Score}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h2
              className="text-2xl font-bold text-gray-800 mb-6 text-center"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allAnswers.map((ans) => (
                <button
                  key={ans}
                  disabled={hasAnswered}
                  onClick={() => handleAnswerSubmit(ans)}
                  className={`py-3 px-4 rounded-lg font-semibold border text-lg transition-all ${
                    selectedAnswer === ans
                      ? isCorrect === null
                        ? "bg-yellow-300"
                        : isCorrect && correctAnswer === ans
                        ? "bg-green-500 text-white"
                        : !isCorrect && correctAnswer === ans
                        ? "bg-green-500 text-white"
                        : !isCorrect && selectedAnswer === ans
                        ? "bg-red-500 text-white"
                        : "bg-gray-100"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  dangerouslySetInnerHTML={{ __html: ans }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-8">Game Over!</h1>
          <div className="text-lg text-gray-700 mb-8">
            <p>Final Scores:</p>
            <p>Player 1: {player1Score}</p>
            <p>Player 2: {player2Score}</p>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-8">
            {winner === "tie"
              ? "It's a Tie!"
              : winner === userId
              ? "You Won! 🏆"
              : "You Lost 😞"}
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition-all transform hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default GameRoom;
