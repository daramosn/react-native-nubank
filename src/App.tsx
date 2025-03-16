/* eslint-disable react/no-unstable-nested-components */
import '../gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {StackNavigator} from './routes/StackNavigator';
import {PaperProvider} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider settings={{icon: props => <Ionicon {...props} />}}>
        <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
        <StackNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
