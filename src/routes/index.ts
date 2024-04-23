import { lazy } from 'react';
const Profile = lazy(() => import('../pages/Profile/index'));
const Calendar = lazy(() => import('../pages/Calendar'));
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
const UnitLesson = lazy(
  () => import('../pages/TeacherPage/English/UnitLesson/index'),
);

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
    path: 'class-list',
    title: 'CLassList',
    component: ClassList,
  },
  {
    path: '/english/unit-lesson',
    title: 'UnitLesson',
    component: UnitLesson,
  },
];

const routes = [...coreRoutes];
export default routes;
