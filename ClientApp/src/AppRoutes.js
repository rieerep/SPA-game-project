import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import GamePage from './components/GamePage';
import Profile from './components/Profile';
import { Home } from "./components/Home";
import Scoreboard from './components/Scoreboard';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/gamepage',
      requireAuth: true,
      element: <GamePage />
    },
    {
        path: '/profile',
        requireAuth: true,
        element: <Profile />
    },
  {
    path: '/scoreboard',
      requireAuth: true,
      element: <Scoreboard />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
