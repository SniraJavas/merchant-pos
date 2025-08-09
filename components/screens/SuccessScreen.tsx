import { CheckCircle } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SuccessScreenProps{
  merchantName : string| number;
  paymentAmount : string|number;
  onDone : () => void;
}
const SuccessScreen : React.FC<SuccessScreenProps> = ({ merchantName, paymentAmount, onDone }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <CheckCircle color="white" size={48} />
        </View>

        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>
          Your facial recognition payment has been processed
        </Text>

        <View style={styles.transactionDetails}>
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Merchant</Text>
            <Text style={styles.value}>{merchantName}</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>${paymentAmount}</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Method</Text>
            <Text style={styles.value}>FacePay</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>FP7849302</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.transactionRow}>
            <Text style={styles.label}>New Balance</Text>
            <Text style={[styles.value, styles.newBalance]}>$1,201.84</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={onDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1fae5', // green-50 to emerald-100 gradient approx
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
    backgroundColor: '#22c55e', // green-500
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    // pulse animation could be added with Animated if needed
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b', // gray-800
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563', // gray-600
    marginBottom: 32,
    textAlign: 'center',
  },
  transactionDetails: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#4b5563', // gray-600
    fontSize: 16,
  },
  value: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1e293b', // gray-800
  },
  newBalance: {
    color: '#16a34a', // green-600
    fontWeight: 'bold',
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // gray-200
    marginVertical: 12,
  },
  doneButton: {
    backgroundColor: '#16a34a', // green-600
    paddingVertical: 16,
    borderRadius: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default SuccessScreen;
