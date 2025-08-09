// import { useTheme } from '@shared/hooks/useTheme';

type Props = {
  filter: "all" | "completed" | "pending";
  sortOrder: "desc" | "asc";
  onFilterChange: (v: "all" | "completed" | "pending") => void;
  onSortChange: (v: "desc" | "asc") => void;
};

export default function Controls({
  filter,
  sortOrder,
  onFilterChange,
  onSortChange,
}: Props) {
  // const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as Props["filter"])}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as Props["sortOrder"])}
          className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>

         {/* <button
          onClick={toggleTheme}
          className="btn btn-outline"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
    </div>
  );
}
