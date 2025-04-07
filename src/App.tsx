import React, { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { useGame } from "./hooks/useGame";
import {
  Lightbulb,
  RotateCcw,
  Trophy,
  HelpCircle,
  Settings2,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [config, setConfig] = useState({ size: 5, difficulty: 0.4 });
  const { gameState, handleCellClick, resetGame } = useGame(config);

  const handleSizeChange = (newSize: number) => {
    setConfig((prev) => ({ ...prev, size: newSize }));
    setShowSettings(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      } flex items-center justify-center p-4`}
    >
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            className={`relative max-w-md w-full rounded-xl shadow-2xl p-6 ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-600"
            }`}
          >
            <button
              onClick={() => setShowHelpModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-full ${
                theme === "dark"
                  ? "hover:bg-gray-700 text-gray-400"
                  : "hover:bg-gray-200 text-gray-500"
              }`}
              aria-label="Close instructions"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-sm space-y-3">
              <h3 className="font-bold text-2xl mb-4 text-center">
                How to Play
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full mt-0.5 flex-shrink-0 ${
                      theme === "dark" ? "bg-yellow-400" : "bg-yellow-500"
                    }`}
                  ></span>
                  <p>Click any cell to toggle its state (on/off)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full mt-0.5 flex-shrink-0 ${
                      theme === "dark" ? "bg-yellow-400" : "bg-yellow-500"
                    }`}
                  ></span>
                  <p>Adjacent cells (up, down, left, right) will also toggle</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full mt-0.5 flex-shrink-0 bg-gray-600"></span>
                  <p>Turn off all lights to win the game</p>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy
                    className={`w-6 h-6 mt-0.5 flex-shrink-0 ${
                      theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                    }`}
                  />
                  <p>Try to win in as few moves as possible!</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowHelpModal(false)}
                className={`px-6 py-2 rounded-lg font-medium ${
                  theme === "dark"
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                } transition-colors`}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-lg w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Lightbulb
              className={`w-8 h-8 ${
                theme === "dark" ? "text-yellow-400" : "text-yellow-500"
              }`}
            />
            <h1 className="text-4xl font-bold">Lights Out</h1>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Turn off all the lights to win!
            </p>
            <button
              onClick={() => setShowHelpModal(true)}
              className={`p-1.5 rounded-full transition-colors ${
                theme === "dark"
                  ? "hover:bg-gray-700 focus:bg-gray-700"
                  : "hover:bg-gray-200 focus:bg-gray-200"
              } focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "focus:ring-yellow-400"
                  : "focus:ring-yellow-500"
              }`}
              aria-label="Game instructions"
            >
              <HelpCircle
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`p-6 rounded-xl shadow-xl ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between mb-4">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Settings2 className="w-4 h-4" />
              Size: {config.size}x{config.size}
            </button>
          </div>

          {showSettings && (
            <div
              className={`mb-4 p-4 rounded-lg grid grid-cols-3 gap-2 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              {[4, 5, 6, 7, 8, 9].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-2 rounded ${
                    config.size === size
                      ? theme === "dark"
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-yellow-500 text-white"
                      : theme === "dark"
                      ? "bg-gray-600 hover:bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {size}x{size}
                </button>
              ))}
            </div>
          )}

          <GameBoard
            board={gameState.board}
            onCellClick={handleCellClick}
            theme={theme}
          />

          <div className="mt-6 flex items-center justify-between">
            <div
              className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
            >
              Moves:{" "}
              <span
                className={theme === "dark" ? "text-white" : "text-gray-900"}
                style={{ fontWeight: "bold" }}
              >
                {gameState.moves}
              </span>
            </div>
            <button
              onClick={resetGame}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {gameState.isWon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold animate-bounce pointer-events-auto ${
                theme === "dark"
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-yellow-500 text-white"
              }`}
            >
              <Trophy className="w-5 h-5" />
              Victory! {gameState.moves} moves
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
