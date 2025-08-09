import TaskItem, { type Task } from "./TaskItem";

type Props = {
  items: Task[];
  onToggle: (t: Task) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ items, onToggle, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="mt-10 text-center text-neutral-500 dark:text-neutral-400">
        No tasks
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {items.map((t) => (
        <TaskItem
          key={t._id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
