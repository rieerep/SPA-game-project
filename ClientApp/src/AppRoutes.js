import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import GamePage from './components/GamePage';
import Profile from './components/Profile';
import { Home } from "./components/Home";
import Scoreboard from './components/Scoreboard';
import ScoreboardDaily from './components/ScoreBoardDaily';

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
    {
      path: '/scoreboarddaily',
      requireAuth: true,
      element: <ScoreboardDaily />
    },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
