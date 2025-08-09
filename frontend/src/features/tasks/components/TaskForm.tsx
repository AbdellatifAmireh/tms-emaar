import { useState } from "react";

type Props = {
  onSubmit: (input: {
    title: string;
    description?: string;
  }) => Promise<void> | void;
};

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError(null);
    await onSubmit({ title, description: description || undefined });
    setTitle('');
    setDescription('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/60 p-4 sm:p-6 shadow-sm"
    >
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title *"
          className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 
            ${error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'}
          `}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

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
  );
}
