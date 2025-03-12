import {StatusBar, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {colors} from '../config/theme/app-theme';

export const AccountScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.safe}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={colors.darkPurple}
        />
        <View style={styles.accountScreen}>
          <Text>AccountScreen</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  accountScreen: {
    flex: 1,
    // backgroundColor: 'white',
  },
});
