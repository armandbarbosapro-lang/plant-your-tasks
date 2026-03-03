import React, { useState, useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import PlantDisplay from "@/components/PlantDisplay";
import useTimeOfDay from "@/hooks/useTimeOfDay";
import useAmbientSound from "@/hooks/useAmbientSound";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

const MAX_TASKS = 12;

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("bloom-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dayProgress = useTimeOfDay();
  const isNight = dayProgress < 0.4;
  const { muted, toggleMute } = useAmbientSound(isNight);

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

  const clearAll = () => setTasks([]);

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div className="h-[100dvh] bg-background flex flex-col items-center overflow-hidden">
      {/* Garden - full width + sound toggle */}
      <div className="w-full flex-shrink-0 relative">
        <PlantDisplay completedCount={completedCount} totalCount={tasks.length} />
        {/* Sound toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-2 right-2 p-1.5 rounded bg-black/20 hover:bg-black/40 transition-colors"
          title={muted ? "Activer le son" : "Couper le son"}
        >
          <svg viewBox="0 0 16 16" className="w-5 h-5" style={{ imageRendering: "pixelated" }}>
            {/* Speaker */}
            <rect x="2" y="5" width="3" height="6" fill="white" />
            <rect x="5" y="3" width="2" height="10" fill="white" />
            <rect x="7" y="1" width="2" height="14" fill="white" />
            {muted ? (
              <>
                {/* X mark */}
                <rect x="11" y="4" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="13" y="6" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="11" y="8" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="13" y="10" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="11" y="10" width="2" height="2" fill="hsl(0, 70%, 55%)" />
                <rect x="13" y="4" width="2" height="2" fill="hsl(0, 70%, 55%)" />
              </>
            ) : (
              <>
                {/* Sound waves */}
                <rect x="11" y="6" width="2" height="4" fill="hsl(120, 50%, 60%)" />
                <rect x="14" y="4" width="1" height="8" fill="hsl(120, 50%, 60%)" opacity={0.6} />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Task list - scrollable */}
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden px-3 pb-2 min-h-0">
        <div className="space-y-2 max-w-md mx-auto">
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
              <button onClick={() => toggleTask(task.id)} className="flex-shrink-0">
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

              <span className={`flex-1 text-xs ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}
                style={{ fontFamily: "'Silkscreen', cursive" }}>
                {task.text}
              </span>

              {/* Separator bar */}
              <div className="w-px h-6 bg-border flex-shrink-0" />

              {/* Pixel X delete */}
              <button onClick={() => deleteTask(task.id)} className="flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity">
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
      </div>

      {/* Bottom section */}
      <div className="w-full flex-shrink-0 px-3 pb-3 pt-1 max-w-md mx-auto space-y-2">
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
              style={{ fontFamily: "'Silkscreen', cursive" }}
            />
            <button onClick={addTask}
              className="px-4 py-3 bg-primary text-primary-foreground text-xs font-bold border-2 border-primary"
              style={{ fontFamily: "'Silkscreen', cursive" }}>
              OK
            </button>
          </div>
        ) : (
          tasks.length < MAX_TASKS && (
            <button
              onClick={() => setShowInput(true)}
              className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-muted-foreground/30 text-muted-foreground text-xs hover:border-primary hover:text-primary transition-colors"
              style={{ fontFamily: "'Silkscreen', cursive" }}
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
          <button onClick={clearAll}
            className="w-full flex items-center justify-center gap-1 text-[10px] text-muted-foreground/50 hover:text-destructive transition-colors"
            style={{ fontFamily: "'Silkscreen', cursive" }}>
            <Trash2 className="w-3 h-3" />
            Effacer
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
