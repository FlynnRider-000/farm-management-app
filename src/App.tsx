import React from 'react';

import Navigation from './navigation/navigation';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {AppWrapper} from './components/AppWrapper';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper>
            <Navigation />
          </AppWrapper>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
