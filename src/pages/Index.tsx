import React, { useState, useEffect, useRef } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import PlantDisplay from "@/components/PlantDisplay";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

const MAX_TASKS = 12;

// Pixel-art logo component
const PixelLogo = () => (
  <div className="flex items-center gap-3 mb-2">
    <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ imageRendering: "pixelated" }}>
      {/* Pot */}
      <rect x="10" y="24" width="12" height="6" fill="hsl(30, 40%, 45%)" />
      <rect x="8" y="22" width="16" height="4" fill="hsl(30, 35%, 40%)" />
      {/* Stem */}
      <rect x="15" y="12" width="2" height="10" fill="hsl(130, 50%, 36%)" />
      {/* Flower */}
      <rect x="11" y="6" width="10" height="8" fill="hsl(345, 65%, 55%)" />
      <rect x="13" y="4" width="6" height="4" fill="hsl(350, 60%, 62%)" />
      <rect x="13" y="8" width="6" height="4" fill="hsl(45, 90%, 65%)" />
      {/* Leaves */}
      <rect x="9" y="14" width="6" height="2" fill="hsl(140, 55%, 42%)" />
      <rect x="17" y="16" width="6" height="2" fill="hsl(140, 55%, 42%)" />
    </svg>
    <span className="text-lg text-primary font-bold tracking-wider">BLOOM</span>
  </div>
);

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("bloom-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("bloom-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [showInput]);

  const addTask = () => {
    if (!newTask.trim() || tasks.length >= MAX_TASKS) return;
    setTasks([...tasks, { id: crypto.randomUUID(), text: newTask.trim(), done: false }]);
    setNewTask("");
    setShowInput(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div className="h-[100dvh] bg-background flex flex-col items-center px-4 py-4 max-w-md mx-auto overflow-hidden">
      {/* Logo */}
      <PixelLogo />

      {/* Plant */}
      <div className="mb-3 flex-shrink-0">
        <PlantDisplay completedCount={completedCount} totalCount={tasks.length} />
      </div>

      {/* Task list - scrollable */}
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden space-y-2 mb-3 min-h-0">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 border-2 transition-all duration-300 ${
              task.done
                ? "bg-primary/15 border-primary/30"
                : "bg-card border-border"
            }`}
            style={{ imageRendering: "auto" }}
          >
            {/* Pixel checkbox */}
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0"
            >
              <svg viewBox="0 0 12 12" className="w-5 h-5" style={{ imageRendering: "pixelated" }}>
                <rect x="0" y="0" width="12" height="12" fill={task.done ? "hsl(90, 55%, 55%)" : "hsl(130, 20%, 34%)"} />
                <rect x="2" y="2" width="8" height="8" fill={task.done ? "hsl(90, 55%, 55%)" : "hsl(130, 30%, 28%)"} />
                {task.done && <>
                  <rect x="2" y="6" width="2" height="2" fill="hsl(130, 40%, 10%)" />
                  <rect x="4" y="8" width="2" height="2" fill="hsl(130, 40%, 10%)" />
                  <rect x="6" y="6" width="2" height="2" fill="hsl(130, 40%, 10%)" />
                  <rect x="8" y="4" width="2" height="2" fill="hsl(130, 40%, 10%)" />
                  <rect x="10" y="2" width="2" height="2" fill="hsl(130, 40%, 10%)" />
                </>}
              </svg>
            </button>
            <span className={`flex-1 text-xs ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {task.text}
            </span>
            {/* Pixel X button */}
            <button
              onClick={() => deleteTask(task.id)}
              className="flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity"
            >
              <svg viewBox="0 0 10 10" className="w-4 h-4" style={{ imageRendering: "pixelated" }}>
                <rect x="0" y="0" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="8" y="0" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="2" y="2" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="6" y="2" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="4" y="4" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="2" y="6" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="6" y="6" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="0" y="8" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="8" y="8" width="2" height="2" fill="hsl(0, 70%, 55%)" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom section - fixed */}
      <div className="w-full flex-shrink-0 space-y-3">
        {showInput ? (
          <div className="w-full flex gap-2">
            <input
              ref={inputRef}
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTask()}
              placeholder="Nouvelle tache..."
              maxLength={50}
              className="flex-1 px-4 py-3 border-2 border-input bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={addTask}
              className="px-4 py-3 bg-primary text-primary-foreground text-xs font-bold border-2 border-primary"
            >
              OK
            </button>
          </div>
        ) : (
          tasks.length < MAX_TASKS && (
            <button
              onClick={() => setShowInput(true)}
              className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-muted-foreground/30 text-muted-foreground text-xs hover:border-primary hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 10 10" className="w-4 h-4" style={{ imageRendering: "pixelated" }}>
                <rect x="4" y="0" width="2" height="10" fill="currentColor" />
                <rect x="0" y="4" width="10" height="2" fill="currentColor" />
              </svg>
              Ajouter
            </button>
          )
        )}

        {tasks.length > 0 && (
          <button
            onClick={clearAll}
            className="w-full flex items-center justify-center gap-1 text-[10px] text-muted-foreground/50 hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Effacer
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
