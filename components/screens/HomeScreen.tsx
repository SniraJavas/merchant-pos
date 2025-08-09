import { CreditCard, Shield, Smartphone, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface HomeScreenProps {
  userBalance: string | number;
  onStartPayment: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userBalance, onStartPayment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>FacePay</Text>
          <Text style={styles.subtitle}>Secure facial payments</Text>
        </View>
        <View style={styles.userIcon}>
          <User color="white" size={24} />
        </View>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>{userBalance}</Text>
          </View>
          <CreditCard color="#4f46e5" size={32} />
        </View>
      </View>

      <View style={{ marginVertical: 16 }}>
        <TouchableOpacity style={styles.primaryButton} onPress={onStartPayment}>
          <Text style={styles.primaryButtonText}>Start Payment</Text>
        </TouchableOpacity>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Shield color="#4f46e5" size={24} />
            <Text style={styles.actionLabel}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Smartphone color="#4f46e5" size={24} />
            <Text style={styles.actionLabel}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.transactionsCard}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>

        <View style={styles.transactionRow}>
          <View>
            <Text style={styles.transactionMerchant}>Starbucks</Text>
            <Text style={styles.transactionDate}>Today, 2:30 PM</Text>
          </View>
          <Text style={styles.transactionAmount}>-$8.45</Text>
        </View>

        <View style={styles.transactionRow}>
          <View>
            <Text style={styles.transactionMerchant}>Metro Station</Text>
            <Text style={styles.transactionDate}>Yesterday, 8:15 AM</Text>
          </View>
          <Text style={styles.transactionAmount}>-$3.20</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    color: '#475569',
  },
  userIcon: {
    backgroundColor: '#4f46e5',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#64748b',
    fontSize: 14,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#374151',
  },
  transactionsCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  transactionsTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  transactionMerchant: {
    fontWeight: '500',
    fontSize: 16,
    color: '#374151',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  transactionAmount: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1e293b',
  },
});

export default HomeScreen;
