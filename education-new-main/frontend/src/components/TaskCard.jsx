import React from "react";
import { CheckCircle2, Clock, ListOrdered, Sparkles } from "lucide-react";

export default function TaskCard({ task, onStatusChange }) {
  const priorityConfig = {
    high: {
      bg: "bg-rose-950/60",
      text: "text-rose-300",
      border: "border-rose-900/60",
      badge: "High Priority",
    },
    medium: {
      bg: "bg-amber-950/60",
      text: "text-amber-300",
      border: "border-amber-900/60",
      badge: "Medium Priority",
    },
    low: {
      bg: "bg-slate-950/60",
      text: "text-slate-400",
      border: "border-slate-850/80",
      badge: "Low Priority",
    },
  }[task.priority] || {
    bg: "bg-slate-950/60",
    text: "text-slate-400",
    border: "border-slate-850/80",
    badge: "Normal",
  };

  const isDone = task.status === "done";

  return (
    <div
      className={`rounded-3xl p-5 border transition-all shadow-xl ${
        isDone
          ? "bg-slate-900/40 border-slate-850/80 opacity-60 text-slate-400"
          : "bg-slate-900/80 border-slate-800/90 hover:border-indigo-500/40 hover:shadow-indigo-500/5 text-slate-100"
      }`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="space-y-1">
          <h3
            className={`font-bold text-sm text-slate-150 ${
              isDone ? "line-through text-slate-500" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
          )}
        </div>

        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}
        >
          {priorityConfig.badge}
        </span>
      </div>

      {task.subtasks?.length > 0 && (
        <div className="mt-4 p-3 rounded-2xl bg-slate-950/50 border border-slate-850/60 space-y-2">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-350">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>AI Chunked Micro-Steps:</span>
          </div>
          <ul className="space-y-1.5">
            {task.subtasks.map((s, i) => (
              <li key={i} className="text-xs flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{s.step}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                  ~{s.estimated_minutes}m
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">Status:</span>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="text-xs font-bold border border-slate-800 rounded-xl px-3 py-1.5 bg-slate-950/80 text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs transition-all"
        >
          <option value="pending">⏳ Pending</option>
          <option value="in_progress">⚡ In Progress</option>
          <option value="done">✅ Done (Auto-Report)</option>
        </select>
      </div>
    </div>
  );
}
