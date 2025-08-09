import { FlatList, StyleSheet, Text, View } from 'react-native';

const TransactionList = ({ transactions }) => {
  const renderItem = ({ item }) => (
    <View style={styles.transactionRow}>
      <View>
        <Text style={styles.merchant}>{item.merchant}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => `${item.merchant}-${index}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  merchant: {
    fontWeight: '500',
    fontSize: 16,
    color: '#374151',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
  amount: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1e293b',
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
});

export default TransactionList;
