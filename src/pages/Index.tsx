import React, { useState, useEffect } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import PlantDisplay from "@/components/PlantDisplay";

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

  useEffect(() => {
    localStorage.setItem("bloom-tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-8 max-w-md mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-foreground mb-1">🌱 Bloom</h1>
      <p className="text-xs text-muted-foreground mb-6">Fais pousser ta journée</p>

      {/* Plant */}
      <div className="mb-6">
        <PlantDisplay completedCount={completedCount} totalCount={tasks.length} />
      </div>

      {/* Progress bar */}
      {tasks.length > 0 && (
        <div className="w-full h-2 rounded-full bg-secondary mb-6 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }}
          />
        </div>
      )}

      {/* Task list */}
      <div className="w-full space-y-2 mb-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
              task.done
                ? "bg-primary/10 border-primary/20"
                : "bg-card border-border"
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                task.done
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground/30"
              }`}
            >
              {task.done && <span className="text-xs">✓</span>}
            </button>
            <span className={`flex-1 text-sm ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-muted-foreground/40 hover:text-destructive transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add task */}
      {showInput ? (
        <div className="w-full flex gap-2">
          <input
            autoFocus
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="Nouvelle tâche..."
            maxLength={50}
            className="flex-1 px-4 py-3 rounded-xl border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={addTask}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            OK
          </button>
        </div>
      ) : (
        tasks.length < MAX_TASKS && (
          <button
            onClick={() => setShowInput(true)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-muted-foreground/30 text-muted-foreground text-sm hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter une tâche
          </button>
        )
      )}

      {tasks.length >= MAX_TASKS && !showInput && (
        <p className="text-xs text-muted-foreground mt-2">Maximum 12 tâches atteint</p>
      )}

      {/* Clear all */}
      {tasks.length > 0 && (
        <button
          onClick={clearAll}
          className="mt-6 flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-destructive transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Tout effacer
        </button>
      )}
    </div>
  );
};

export default Index;
