import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  recipient: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function TransactionsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'sent',
      amount: 1500,
      recipient: '+91 9876543210',
      date: '2024-01-15T10:30:00Z',
      status: 'completed',
    },
    {
      id: '2',
      type: 'received',
      amount: 2500,
      recipient: '+91 8765432109',
      date: '2024-01-14T15:45:00Z',
      status: 'completed',
    },
    {
      id: '3',
      type: 'sent',
      amount: 500,
      recipient: '+91 7654321098',
      date: '2024-01-13T09:15:00Z',
      status: 'completed',
    },
    {
      id: '4',
      type: 'sent',
      amount: 1000,
      recipient: '+91 6543210987',
      date: '2024-01-12T14:20:00Z',
      status: 'pending',
    },
    {
      id: '5',
      type: 'received',
      amount: 750,
      recipient: '+91 5432109876',
      date: '2024-01-11T11:30:00Z',
      status: 'completed',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    } else {
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#666';
    }
  };

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'pending') return 'clock.fill';
    if (status === 'failed') return 'xmark.circle.fill';
    return type === 'sent' ? 'arrow.up.circle.fill' : 'arrow.down.circle.fill';
  };

  const totalSent = transactions
    .filter(t => t.type === 'sent' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalReceived = transactions
    .filter(t => t.type === 'received' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <IconSymbol
            size={32}
            color="#FF9900"
            name="list.bullet.clipboard.fill"
            style={styles.headerIcon}
          />
          <ThemedText type="title" style={styles.headerTitle}>
            Transactions
          </ThemedText>
          {/* <Text style={styles.headerSubtitle}>
            Your payment history
          </Text> */}
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <IconSymbol
              size={24}
              color="#EF4444"
              name="arrow.up.circle.fill"
              style={styles.summaryIcon}
            />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Total Sent</Text>
              <Text style={[styles.summaryAmount, { color: '#EF4444' }]}>
                {formatAmount(totalSent)}
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <IconSymbol
              size={24}
              color="#10B981"
              name="arrow.down.circle.fill"
              style={styles.summaryIcon}
            />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Total Received</Text>
              <Text style={[styles.summaryAmount, { color: '#10B981' }]}>
                {formatAmount(totalReceived)}
              </Text>
            </View>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {transactions.map((transaction) => (
            <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconSymbol
                  size={24}
                  color={
                    transaction.type === 'sent'
                      ? '#EF4444'
                      : transaction.status === 'pending'
                        ? '#F59E0B'
                        : '#10B981'
                  }
                  name={getTransactionIcon(transaction.type, transaction.status)}
                />
              </View>

              <View style={styles.transactionDetails}>
                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionType}>
                    {transaction.type === 'sent' ? 'Sent to' : 'Received from'}
                  </Text>
                  <Text style={[
                    styles.transactionAmount,
                    {
                      color: transaction.type === 'sent' ? '#EF4444' : '#10B981'
                    }
                  ]}>
                    {transaction.type === 'sent' ? '-' : '+'}
                    {formatAmount(transaction.amount)}
                  </Text>
                </View>

                <Text style={styles.transactionRecipient}>
                  {transaction.recipient}
                </Text>

                <View style={styles.transactionFooter}>
                  <Text style={styles.transactionDate}>
                    {formatDate(transaction.date)}
                  </Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(transaction.status) + '20' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(transaction.status) }
                    ]}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Load More Button */}
        {/* <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More Transactions</Text>
          <IconSymbol
            size={16}
            color="#FF9900"
            name="chevron.down"
            style={styles.loadMoreIcon}
          />
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 20,
  },
  headerIcon: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#232F3E',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryIcon: {
    marginRight: 12,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#232F3E',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIcon: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 14,
    color: '#232F3E',
    fontWeight: '500',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionRecipient: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF9900',
  },
  loadMoreText: {
    color: '#FF9900',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  loadMoreIcon: {
    marginLeft: 4,
  },
});
