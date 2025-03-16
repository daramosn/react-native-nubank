import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {SkeletonItem} from '../components/SkeletonItem';
import {colors} from '../config/theme/app-theme';
import accountData from '../database/accountData.json';
import type {AccountDetails, Transaction} from '../types/accountData';
import {StackActions, useNavigation} from '@react-navigation/native';
import {formatToCOP} from '../utilities/formatToCOP';
import {formatDate} from '../utilities/formatDate';

export const AccountScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<AccountDetails>({} as AccountDetails);
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigation();

  const placeholderTransactions: Transaction[] = Array.from({length: 5}).map(
    (_, index) => ({
      id: index, // number instead of string
      place: '',
      date: '',
      amount: 0,
    }),
  );

  const handleGoBack = () => {
    navigator.dispatch(StackActions.pop());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(accountData.data);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const renderAccountHeader = () => (
    <View style={styles.accountScreen}>
      <View style={styles.navigationHeader}>
        <Pressable onPress={handleGoBack}>
          <Icon name="chevron-back" size={24} />
        </Pressable>
      </View>
      <View style={styles.available}>
        <Text style={styles.availableMessage}>Saldo disponible</Text>
        {isLoading && <SkeletonItem style={styles.availableAmountSkeleton} />}
        {!isLoading && (
          <Text style={styles.availableAmount}>
            {formatToCOP(data?.amountAvailable)}
          </Text>
        )}
      </View>

      <Pressable style={styles.pocket}>
        <Icon name="cash-outline" size={24} />
        <View style={styles.pocketInfo}>
          <Text style={styles.pocketInfoMessage}>Dinero en tus cajitas</Text>

          {isLoading && (
            <SkeletonItem style={styles.pocketInfoAmountSkeleton} />
          )}
          {!isLoading && (
            <>
              <Text style={styles.pocketInfoAmount}>
                {formatToCOP(data.box.amount)}
              </Text>
              <View style={styles.pocketInfoProfit}>
                <Icon name="arrow-up" size={24} color={colors.green} />
                <Text style={styles.pocketInfoProfitNumber}>
                  {formatToCOP(data.box.profit)}
                </Text>
              </View>
            </>
          )}
        </View>
        <Icon name="chevron-forward" size={24} />
      </Pressable>

      <View style={styles.actions}>
        <Pressable style={styles.actionsButton}>
          <View style={styles.actionsIcon}>
            <Icon name="wallet-outline" size={24} />
          </View>
          <Text style={styles.actionsText}>Depositar</Text>
        </Pressable>
        <Pressable style={styles.actionsButton}>
          <View style={styles.actionsIcon}>
            <Icon name="paper-plane-outline" size={24} />
          </View>
          <Text style={styles.actionsText}>Enviar</Text>
        </Pressable>
        <Pressable style={styles.actionsButton}>
          <View style={styles.actionsIcon}>
            <Icon name="card-outline" size={24} />
          </View>
          <Text style={styles.actionsText}>Pagar mi tarjeta</Text>
        </Pressable>
        <Pressable style={styles.actionsButton}>
          <View style={styles.actionsIcon}>
            <Icon name="document-text-outline" size={24} />
          </View>
          <Text style={styles.actionsText}>Pedir extracto</Text>
        </Pressable>
      </View>

      <View style={styles.details}>
        <Icon name="newspaper-outline" size={16} />
        <Text style={styles.detailsText}>Detalles de mi cuenta</Text>
        <Icon name="chevron-forward" size={16} />
      </View>
    </View>
  );

  const renderHistoryHeader = () => (
    <View style={styles.history}>
      <Text style={styles.historyTitle}>History</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon="search"
        style={styles.historySearch}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={'light-content'} />
      <SectionList
        style={styles.section}
        sections={[
          {
            title: 'History',
            data: isLoading ? placeholderTransactions : data?.transactions!,
          },
        ]}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          if (isLoading) {
            return (
              <View style={styles.transaction}>
                <SkeletonItem style={styles.transactionIconSkeleton} />
                <View style={styles.transactionMessage}>
                  <SkeletonItem style={styles.transactionDetailsSkeleton} />
                  <SkeletonItem style={styles.transactionDateSkeleton} />
                </View>
                <SkeletonItem style={styles.transactionAmountSkeleton} />
              </View>
            );
          }

          return (
            <View style={styles.transaction}>
              <View style={styles.transactionIcon}>
                <Icon name="cash-outline" size={24} />
              </View>
              <View style={styles.transactionMessage}>
                <Text style={styles.transactionDetails}>
                  You paid in {item.place}
                </Text>
                <Text style={styles.transactionDate}>
                  {formatDate(item.date)}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>
                {formatToCOP(item.amount)}
              </Text>
            </View>
          );
        }}
        ListHeaderComponent={renderAccountHeader}
        renderSectionHeader={renderHistoryHeader}
        stickySectionHeadersEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
  },
  accountScreen: {
    backgroundColor: 'white',
    borderColor: colors.lightGray,
    borderBottomWidth: 1,
  },

  navigationHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  available: {padding: 16, paddingHorizontal: 24},
  availableMessage: {fontSize: 16, color: colors.gray},
  availableAmount: {fontSize: 32, fontWeight: 700, color: 'black'},
  availableAmountSkeleton: {height: 40, borderRadius: 4},
  pocket: {
    padding: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  pocketInfo: {flex: 1},
  pocketInfoMessage: {fontSize: 15, color: colors.gray},
  pocketInfoAmount: {fontSize: 18, fontWeight: 700, color: 'black'},
  pocketInfoAmountSkeleton: {height: 40, borderRadius: 4},
  pocketInfoProfit: {flexDirection: 'row', alignItems: 'center'},
  pocketInfoProfitNumber: {color: colors.green},
  actions: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  actionsButton: {alignItems: 'center'},
  actionsIcon: {
    padding: 22,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
  },
  actionsText: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 8,
    maxWidth: 70,
    textAlign: 'center',
  },
  details: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.lightGray,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
  },
  detailsText: {fontSize: 16, fontWeight: 500, flex: 1},
  history: {
    paddingInline: 24,
    paddingBlock: 16,
    gap: 16,
    backgroundColor: 'white',
  },
  historyTitle: {fontSize: 24, fontWeight: 600},
  historySearch: {backgroundColor: colors.lightGray},
  transaction: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingBlock: 16,
    paddingInline: 24,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  transactionIcon: {
    backgroundColor: colors.lightGray,
    borderRadius: 50,
    padding: 16,
  },
  transactionIconSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  transactionMessage: {flex: 1},
  transactionDetails: {fontSize: 18, fontWeight: 600, maxWidth: 160},
  transactionDetailsSkeleton: {width: 160, height: 18},
  transactionDate: {fontSize: 14, color: colors.gray},
  transactionDateSkeleton: {width: 100, height: 14, marginTop: 8},
  transactionAmount: {fontSize: 18, fontWeight: 600},
  transactionAmountSkeleton: {width: 60, height: 18},
});
