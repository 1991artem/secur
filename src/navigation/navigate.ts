import {createNavigationContainerRef} from '@react-navigation/native';
import {AppNavigationProps} from '../types/navigationTypes';
import {NavigationRoutes} from '../types/routes';

export const navigationRef = createNavigationContainerRef<AppNavigationProps>();

export function navigate(name: NavigationRoutes, params?: any) {
  if (navigationRef.isReady()) {
    return navigationRef.navigate(name, params);
  }
}
