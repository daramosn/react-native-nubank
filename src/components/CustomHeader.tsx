import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const CustomHeader = () => {
  return (
    <View style={styles.CustomHeader}>
      <Icon name="chevron-back-outline" size={16} color="white" />
      <Text style={styles.text}>CustomHeader</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  CustomHeader: {
    flex: 1,
    backgroundColor: 'red',
    padding: 24,
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
