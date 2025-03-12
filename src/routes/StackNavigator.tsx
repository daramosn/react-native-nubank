import {createStackNavigator} from '@react-navigation/stack';
import {AccountScreen} from '../screens/AccountScreen';
import {HomeScreen} from '../screens/HomeScreen';

export type RootStackParams = {
  Home: undefined;
  Account: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
};
