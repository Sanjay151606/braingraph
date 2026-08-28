import { useEffect, useRef, useState } from "react";
import Card from "../components/common/Card";
import { Play, Pause, RotateCcw, BellOff, Sparkles, Volume2 } from "lucide-react";

export default function FocusMode() {
  const [minutes, setMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [distractions, setDistractions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const restart = (mins) => {
    setMinutes(mins);
    setSecondsLeft(mins * 60);
    setRunning(false);
    setDistractions(0);
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 lg:p-8 text-center space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
          <span>Sustained Focus Mode</span>
          <span>🎯</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
          Low-distraction intervals designed to enter and preserve flow state.
        </p>
      </div>

      {/* Timer Card */}
      <Card className="p-8 sm:p-12 space-y-6 shadow-xl border-slate-800/80">
        <div className="py-4">
          <p className="text-6xl sm:text-7xl font-mono font-black text-indigo-400 tracking-tight">
            {mm}:{ss}
          </p>
          <span className="text-[11px] font-bold text-slate-450 uppercase tracking-wider block mt-2">
            {running ? "⚡ Focus Block in Progress" : "⏸ Paused"}
          </span>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className={`px-6 py-3 rounded-2xl text-xs font-bold text-white transition flex items-center gap-2 shadow-sm cursor-pointer ${
              running
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-brain-600 hover:bg-brain-700"
            }`}
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{running ? "Pause Sprint" : "Start Sprint"}</span>
          </button>

          <button
            type="button"
            onClick={() => restart(minutes)}
            className="px-4 py-3 rounded-2xl bg-slate-850 hover:bg-slate-800 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-800/80"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Interval Selectors */}
        <div className="flex justify-center gap-2 pt-2 border-t border-slate-800/80">
          {[15, 25, 45].map((m) => (
            <button
              key={m}
              onClick={() => restart(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                minutes === m
                  ? "bg-indigo-950 text-indigo-300 ring-2 ring-indigo-500/20 border border-indigo-800"
                  : "bg-slate-950/60 text-slate-400 hover:bg-slate-900 border border-slate-800"
              }`}
            >
              {m} min sprint
            </button>
          ))}
        </div>
      </Card>

      {/* Non-shaming Distraction Logger */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setDistractions((d) => d + 1)}
          className="px-4 py-2 rounded-2xl bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/60 text-amber-300 text-xs font-bold transition inline-flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <BellOff className="w-3.5 h-3.5 text-amber-400" />
          <span>Noticed a Distraction? ({distractions} logged)</span>
        </button>
        <p className="text-[11px] text-slate-400">
          Logging distractions is non-punitive—it helps calibrate adaptive focus span lengths.
        </p>
      </div>
    </div>
  );
}
