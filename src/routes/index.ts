import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile/index'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../components/UiElements/Alerts'));
const Buttons = lazy(() => import('../components/UiElements/Buttons'));
const Teacher = lazy(() => import('../pages/AdminAgency/Users/Teacher/index'));
const Student = lazy(() => import('../pages/AdminAgency/Users/Student/index'));
const Class = lazy(() => import('../pages/AdminAgency/Class/index'));
const DetailClass = lazy(
  () => import('../pages/AdminAgency/Class/Detail/index'),
);
const Course = lazy(() => import('../pages/AdminAgency/Course/index'));
//teacher
const ClassList = lazy(() => import('../pages/TeacherPage/ClassList/index'));

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
  },
  {
    path: '/khoa-hoc',
    title: 'Course',
    component: Course,
  },
  {
    path: '/teacher/classList',
    title: 'CLassList',
    component: ClassList,
  },
];

const routes = [...coreRoutes];
export default routes;
