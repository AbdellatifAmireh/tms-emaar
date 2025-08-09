import { useEffect, useMemo, useState } from "react";
import { API_BASE } from "@shared/config/env";
import axios from "axios";
import Controls from "../components/Controls";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
};

// const API = import.meta.env.VITE_API_URL as string | undefined || '/api';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  async function load() {
    const { data } = await axios.get<Task[]>(`${API_BASE}/tasks`);
    setTasks(data);
  }

  async function add(input: { title: string; description?: string }) {
    await axios.post(`${API_BASE}/tasks`, input);
    await load();
  }

  async function isCompleted(t: Task) {
    await axios.put(`${API_BASE}/tasks/${t._id}`, { completed: !t.completed });
    await load();
  }

  async function remove(id: string) {
    await axios.delete(`${API_BASE}/tasks/${id}`);
    await load();
  }

  const filtered = useMemo(() => {
    return tasks
      .filter((t) =>
        filter === "completed"
          ? t.completed
          : filter === "pending"
          ? !t.completed
          : true
      )
      .sort((a, b) => {
        const da = new Date(a.created_at ?? 0).getTime();
        const db = new Date(b.created_at ?? 0).getTime();
        return sortOrder === "desc" ? db - da : da - db;
      });
  }, [tasks, filter, sortOrder]);

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <header className="border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-green-600 dark:text-green-400">
              Task Management System (TMS)
            </span>{" "}
            · EMAAR
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Create by Abdellatif Amireh
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <Controls
          filter={filter}
          sortOrder={sortOrder}
          onFilterChange={setFilter}
          onSortChange={setSortOrder}
        />
        <TaskForm onSubmit={add} />
        <TaskList items={filtered} onToggle={isCompleted} onDelete={remove} />
      </main>
    </div>
  );
}
