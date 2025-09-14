import { lazy } from 'react';
const Alerts = lazy(() => import('../components/UiElements/Alerts'));
const Buttons = lazy(() => import('../components/UiElements/Buttons'));
const LinkFB = lazy(() => import('../pages/facebook/Link/index'));
const CommentFb = lazy(() => import('../pages/facebook/Comment/index'));
const Forbidden = lazy(() => import('../pages/components/Error/Forbidden'));

const coreRoutes = [
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
    path: '/facebook-link',
    component: LinkFB,
  },
  {
    path: '/facebook-comment',
    component: CommentFb,
  },

  //HTTP
  {
    path: '/error/403',
    title: 'Forbidden',
    component: Forbidden,
  },
];

const routes = [...coreRoutes];
export default routes;
