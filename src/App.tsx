import '../gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {StackNavigator} from './routes/StackNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
