export type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: string;
};

type Props = {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="group flex items-start gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/60 p-4 sm:p-5 hover:shadow-md transition">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
        className="mt-1 h-5 w-5 accent-green-600"
      />

      <div className="flex-1">
        <div className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-green-600">
          <span
            className={task.completed ? "line-through text-neutral-400" : ""}
          >
            {task.title}
          </span>
        </div>
        {task.description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(task._id)}
        className="ml-auto rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
      >
        Delete
      </button>
    </li>
  );
}
