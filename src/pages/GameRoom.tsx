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
    if (!userId || token) {
      navigate("/signin");
    }
  });

  useEffect(() => {
    if (!token || !userId) {
      navigate("/signin");
      return;
    }

    // Socket event listeners
    socket.on("waiting", (data: any) => {
      console.log("Waiting for opponent...", data);
      setGameState("waiting");
    });

    socket.on("roomReady", (data: { room: RoomData }) => {
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
      },
    );

    socket.on("answered", (data: { isCorrect: boolean; answer: string }) => {
      console.log("Answer result:", data);
      setIsCorrect(data.isCorrect);
      setCorrectAnswer(data.answer);
    });

    socket.on(
      "scores_updates",
      (data: { player1Score: number; player2Score: number }) => {
        console.log("Scores updated:", data);
        setPlayer1Score(data.player1Score);
        setPlayer2Score(data.player2Score);
      },
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
      },
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
      },
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

  return <div></div>;
};

export default GameRoom;
