import React from 'react';
//@ts-ignore
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {RootNavigator} from './navigator';
import {PersistGate} from 'redux-persist/es/integration/react';

/**
 * @class App
 * @description Creating App screen
 */
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={true} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

/**
 * @exports App Component
 */
export default App;
