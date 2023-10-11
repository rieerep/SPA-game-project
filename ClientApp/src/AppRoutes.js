import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Game from './components/Game';
import { Home } from "./components/Home";
import Scoreboard from './components/Scoreboard';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/game',
      requireAuth: true,
      element: <Game />
  },
  {
    path: '/scoreboard',
      requireAuth: true,
      element: <Scoreboard />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
