import { useRoutes } from 'react-router';
import { Navigate } from 'react-router-dom';
import Course from './Course';
import Courses from './Courses';

const routeList = [
  {
    path: 'courses',
    element: <Courses />,
  },
  {
    path: 'courses/:id',
    element: <Course />,
  },
  { path: '*', element: <Navigate to="/courses?page=1" /> },
];

const AppRoutes = () => {
  return useRoutes(routeList);
};

export default AppRoutes;
