import React from 'react';

import {store} from './redux/app/store';
import {Provider} from 'react-redux';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import AppNavigation from './navigation/AppNavigation';
import axios from 'axios';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

// const httpAxios = axios.create({
//   baseURL: 'http://localhost:4500/api/v1',
//   timeout: 1000,
//   headers: {'Content-Type': 'application/json'},
// });

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}

export default App;

// export {httpAxios};
