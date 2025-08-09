import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TasksPage from '@features/tasks/pages/TasksPage';

const router = createBrowserRouter([{ path: '/', element: <TasksPage /> }]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
