import {NavigationRoutes} from './routes';

export type AuthStackNavigation = {
  [NavigationRoutes.AUTH]?: {login?: string};
};

export type HomeStackNavigation = {
  [NavigationRoutes.HOME_SCREEN]?: {};
};

export type AppNavigationProps = HomeStackNavigation & AuthStackNavigation;
