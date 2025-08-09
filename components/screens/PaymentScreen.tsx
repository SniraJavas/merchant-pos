import { Camera } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PaymentScreenProps {
  merchantName : string | number;
  paymentAmount : string | number;
  onScanPress : () => void;
  onCancelPress : () => void;
}

const PaymentScreen : React.FC<PaymentScreenProps> = ({ merchantName, paymentAmount, onScanPress, onCancelPress }) => {
  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancelPress} style={styles.backButton}>
          <View style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>Confirm Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.merchantInfo}>
        <View style={styles.merchantIcon}>
          <Text style={styles.merchantInitials}>CC</Text>
        </View>
        <Text style={styles.merchantName}>{merchantName}</Text>
        <Text style={styles.merchantLocation}>Downtown Location</Text>
      </View>

      <View style={{ alignItems: 'center', marginVertical: 24 }}>
        <Text style={styles.amountLabel}>Amount to pay</Text>
        <Text style={styles.amountValue}>${paymentAmount}</Text>
      </View>

      <View style={styles.paymentMethod}>
        <Camera color="white" size={32} style={{ marginRight: 16 }} />
        <View>
          <Text style={styles.methodTitle}>Facial Recognition</Text>
          <Text style={styles.methodSubtitle}>Secure biometric payment</Text>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', marginVertical: 16 }}>
        <TouchableOpacity style={styles.primaryButton} onPress={onScanPress}>
          <Text style={styles.primaryButtonText}>Scan Face to Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={onCancelPress}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#475569',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e293b',
  },
  merchantInfo: {
    backgroundColor: '#f9fafb',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  merchantIcon: {
    backgroundColor: '#4f46e5',
    borderRadius: 48,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  merchantInitials: {
    color: 'white',
    fontWeight: '700',
    fontSize: 28,
  },
  merchantName: {
    fontWeight: '700',
    fontSize: 20,
    color: '#1e293b',
  },
  merchantLocation: {
    color: '#475569',
  },
  amountLabel: {
    color: '#64748b',
    fontSize: 16,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  paymentMethod: {
    backgroundColor: '#6366f1',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  methodTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  methodSubtitle: {
    color: '#c7d2fe',
    fontSize: 14,
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
  cancelButton: {
    borderWidth: 2,
    borderColor: '#d1d5db',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default PaymentScreen;
