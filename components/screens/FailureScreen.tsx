 import { XCircle } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FailureScreenProps {
  merchantName: string | number;
  paymentAmount: string | number;
  onTryAgain: () => void;
  onCancel: () => void;
  errorReason?: string;
}

const FailureScreen: React.FC<FailureScreenProps> = ({ 
  merchantName, 
  paymentAmount, 
  onTryAgain, 
  onCancel,
  errorReason = "Face recognition failed"
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <XCircle color="white" size={48} />
        </View>

        <Text style={styles.title}>Payment Failed</Text>
        <Text style={styles.subtitle}>
          {errorReason}. Please try again or use another payment method.
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
            <Text style={styles.label}>Status</Text>
            <Text style={[styles.value, styles.failureStatus]}>Failed</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.errorDetails}>
            <Text style={styles.errorTitle}>What went wrong?</Text>
            <Text style={styles.errorText}>
              • Face not clearly visible{'\n'}
              • Poor lighting conditions{'\n'}
              • Camera permission denied{'\n'}
              • Network connection issues
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgain}>
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Use Different Method</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef2f2', // red-50 background
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
    backgroundColor: '#ef4444', // red-500
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    // Could add shake animation with Animated if needed
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
    lineHeight: 24,
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
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444', // red-500 accent
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
  failureStatus: {
    color: '#dc2626', // red-600
    fontWeight: 'bold',
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // gray-200
    marginVertical: 16,
  },
  errorDetails: {
    marginTop: 8,
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151', // gray-700
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#6b7280', // gray-500
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 360,
    gap: 12,
  },
  tryAgainButton: {
    backgroundColor: '#ef4444', // red-500
    paddingVertical: 16,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  tryAgainButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6b7280', // gray-500
  },
  cancelButtonText: {
    color: '#4b5563', // gray-600
    fontWeight: '600',
    fontSize: 16,
  },
});

export default FailureScreen;