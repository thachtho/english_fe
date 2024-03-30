import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../components/UiElements/Alerts'));
const Buttons = lazy(() => import('../components/UiElements/Buttons'));
const Teacher = lazy(() => import('../pages/Users/Teacher/Teacher'));
const Student = lazy(() => import('../pages/Users/Student/Student'));
const Class = lazy(() => import('../pages/Class/index'));
const DetailClass = lazy(() => import('../pages/Class/Detail/index'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/user/teacher',
    title: 'Teacher',
    component: Teacher,
  },
  {
    path: '/user/student',
    title: 'Student',
    component: Student,
  },
  {
    path: '/class',
    title: 'Class',
    component: Class,
  },
  {
    path: '/class/:id',
    title: 'Detail',
    component: DetailClass,
  }
];

const routes = [...coreRoutes];
export default routes;
