import { useState, useEffect } from "react";
import axios from "axios";

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
};

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const loadTasks = async () => {
    const { data } = await axios.get<Task[]>(`${API}/tasks`);
    setTasks(data);
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await axios.post(`${API}/tasks`, {
      title,
      description: description || undefined,
    });
    setTitle("");
    setDescription("");
    loadTasks();
  };

  const toggleCompleted = async (t: Task) => {
    await axios.put(`${API}/tasks/${t._id}`, { completed: !t.completed });
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API}/tasks/${id}`);
    loadTasks();
  };

  const filtered = tasks
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

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <header className="border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-indigo-600 dark:text-indigo-400">TMS</span> ·
            EMAAR
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Minimal task manager — add, complete, filter, sort.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Add form */}
        <form
          onSubmit={addTask}
          className="mt-6 grid gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/60 p-4 sm:p-6 shadow-sm"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title *"
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-5 py-2.5 font-medium shadow-sm transition"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* List */}
        <ul className="mt-6 space-y-3">
          {filtered.map((t) => (
            <li
              key={t._id}
              className="group flex items-start gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/60 p-4 sm:p-5 hover:shadow-md transition"
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleCompleted(t)}
                className="mt-1 h-5 w-5 accent-indigo-600"
              />

              <div className="flex-1">
                <div className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-indigo-600">
                  <span
                    className={
                      t.completed ? "line-through text-neutral-400" : ""
                    }
                  >
                    {t.title}
                  </span>
                </div>
                {t.description && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {t.description}
                  </p>
                )}
              </div>

              <button
                onClick={() => deleteTask(t._id)}
                className="ml-auto rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-neutral-500 dark:text-neutral-400">
            No tasks yet — add your first one!
          </div>
        )}
      </main>
    </div>
  );
}
