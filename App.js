import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/navigation/Routes';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import { store } from './src/store/store';
import { persistStore } from 'reduxjs-toolkit-persist';
import { Provider } from 'react-redux';

const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
