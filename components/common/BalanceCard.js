import { CreditCard } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

const BalanceCard = ({ balance }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Available Balance</Text>
          <Text style={styles.balance}>{balance}</Text>
        </View>
        <CreditCard color="#4f46e5" size={32} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#64748b',
    fontSize: 14,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
  },
});

export default BalanceCard;
