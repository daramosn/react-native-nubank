import React from 'react';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {type RootStackParams} from '../routes/StackNavigator';
import {colors} from '../config/theme/app-theme';
import {Button} from 'react-native-paper';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const navigateTo = () => {
    navigation.navigate('Account');
  };

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <View style={styles.header_actions}>
              <View style={styles.avatar}>
                <Icon name="person-outline" size={16} color="white" />
              </View>
              <View style={styles.options}>
                <Icon name="eye-outline" size={24} color="white" />
                <Icon name="help-circle-outline" size={24} color="white" />
                <Icon name="person-add-outline" size={22} color="white" />
              </View>
            </View>
            <View style={styles.name}>
              <Text style={styles.name_text}>Hello, Diego</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Pressable style={styles.info} onPress={navigateTo}>
              <View style={styles.info_details}>
                <View style={styles.info_detailsText}>
                  <Text style={styles.info_detailsTitle}>
                    Cuenta de ahorros
                  </Text>
                  <Text style={styles.info_detailsAmount}>$0.00</Text>
                  <Text style={styles.info_detailsMessage}>
                    El dinero de tus cajitas crece hasta 11,10% E.A.
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={24} />
              </View>
            </Pressable>
            <View style={styles.actions}>
              <View style={styles.actionsButton}>
                <View style={styles.actionsIcon}>
                  <Icon name="wallet-outline" size={24} />
                </View>
                <Text style={styles.actionsText}>Depositar</Text>
              </View>
              <View style={styles.actionsButton}>
                <View style={styles.actionsIcon}>
                  <Icon name="paper-plane-outline" size={24} />
                </View>
                <Text style={styles.actionsText}>Enviar</Text>
              </View>
              <View style={styles.actionsButton}>
                <View style={styles.actionsIcon}>
                  <Icon name="key-outline" size={24} />
                </View>
                <Text style={styles.actionsText}>Tus llaves</Text>
              </View>
            </View>
            <View style={styles.details}>
              <Icon name="newspaper-outline" size={16} />
              <Text style={styles.detailsText}>Detalles de mi cuenta</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Pressable style={styles.info} onPress={navigateTo}>
              <View style={styles.info_details}>
                <View style={styles.info_detailsText}>
                  <Text style={styles.info_detailsTitle}>
                    Tarjeta de crédito
                  </Text>
                </View>
                <Icon name="chevron-forward-outline" size={24} />
              </View>
            </Pressable>
            <View style={styles.debt}>
              <Text style={styles.debtTitle}>Lo que debes de tu moradita</Text>
              <Text style={styles.debtAmount}>$1.200.234,67</Text>
            </View>
            <View style={styles.payment}>
              <Text style={styles.paymentMin}>Pago mínimo $1.033.298,75</Text>
              <View style={styles.paymentButtons}>
                <Button style={styles.paymentPay} mode="contained">
                  Pagar
                </Button>
                <Button style={styles.paymentManage} mode="contained-tonal">
                  Gestionar deuda
                </Button>
              </View>
            </View>
            <View style={styles.details}>
              <Icon name="card-outline" size={16} />
              <Text style={styles.detailsText}>Mis tarjetas</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#830AD1'},
  mainContent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: colors.purple,
  },
  header_actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.purple,
  },
  avatar: {
    padding: 10,
    backgroundColor: colors.lightPurple,
    borderRadius: 50,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  name: {
    padding: 16,
  },
  name_text: {
    fontSize: 24,
    color: 'white',
  },

  section: {borderBottomWidth: 1, borderColor: colors.lightGray},

  info: {padding: 16},
  info_details: {flexDirection: 'row', gap: 8},
  info_detailsText: {flex: 1},
  info_detailsTitle: {fontWeight: 600, fontSize: 24},
  info_detailsAmount: {fontWeight: 600, fontSize: 24},
  info_detailsMessage: {marginTop: 12, fontSize: 15, color: colors.gray},

  actions: {flexDirection: 'row', gap: 16, padding: 16},
  actionsButton: {alignItems: 'center'},
  actionsIcon: {
    padding: 22,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
  },
  actionsText: {fontSize: 16, fontWeight: 700, marginTop: 8},

  debt: {
    paddingInline: 16,
  },
  debtTitle: {
    fontSize: 18,
  },
  debtAmount: {
    fontSize: 20,
    fontWeight: 700,
  },

  payment: {padding: 16, gap: 16},
  paymentMin: {color: colors.purple},
  paymentButtons: {flexDirection: 'row', gap: 8},
  paymentPay: {backgroundColor: colors.purple},
  paymentManage: {backgroundColor: colors.lightGray},

  details: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 15,
  },
  detailsText: {fontSize: 16, fontWeight: 500},
});
