import React from "react";

/**
 * Shared LoadingSpinner Component for BrainGraph
 */
export default function LoadingSpinner({
  label = "Loading...",
  size = "md", // sm | md | lg
  className = "",
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  }[size] || "w-6 h-6 border-2";

  return (
    <div className={`p-8 text-center bg-slate-900/80 rounded-3xl border border-slate-800/90 shadow-xl space-y-3 ${className}`}>
      <div
        className={`${sizeClasses} border-slate-800 border-t-indigo-500 rounded-full animate-spin mx-auto`}
        role="status"
        aria-label={label}
      />
      <p className="text-xs font-bold text-slate-400">{label}</p>
    </div>
  );
}
