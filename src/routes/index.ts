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
const StudyProgramDetail = lazy(
  () => import('../pages/TeacherPage/English/StudyProgramDetail/index'),
);
const StudyProgram = lazy(
  () => import('../pages/TeacherPage/English/StudyProgram/index'),
);
const Variable = lazy(
  () => import('../pages/TeacherPage/English/Variable/index'),
);

const ClassManager = lazy(
  () => import('../pages/TeacherPage/ClassManager/index'),
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
    path: '/english/study-program/:id',
    title: 'StudyProgramDetail',
    component: StudyProgramDetail,
  },
  {
    path: '/english/study-program',
    title: 'StudyProgram',
    component: StudyProgram,
  },
  {
    path: '/english/lesson/:id/variable',
    title: 'Variable',
    component: Variable,
  },
  {
    path: '/class-manager/:id',
    title: 'ClassManager',
    component: ClassManager,
  },
];

const routes = [...coreRoutes];
export default routes;
