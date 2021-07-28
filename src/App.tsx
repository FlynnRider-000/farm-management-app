import React from 'react';

import Navigation from './navigation/navigation';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {AppWrapper} from './components/AppWrapper';
import {Container} from 'native-base';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <AppWrapper>
            <Navigation />
          </AppWrapper>
        </Container>
      </PersistGate>
    </Provider>
  );
};

export default App;
