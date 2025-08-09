import { User } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ScanningScreenProps {
  scanProgress : number, 
  isScanning : string | number, 
  merchantName : string | number, 
  paymentAmount : string | number, 
  onCancelPress : () => void;
}

const ScanningScreen : React.FC<ScanningScreenProps>  = ({ 
  scanProgress , 
  isScanning, 
  merchantName, 
  paymentAmount, 
  onCancelPress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancelPress} style={styles.backButton}>
          <View style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>Face Scan</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.cameraView}>
        <View style={styles.faceFrame}>
          {/* Corner markers */}
          <View style={[styles.cornerMarker, styles.topLeft]} />
          <View style={[styles.cornerMarker, styles.topRight]} />
          <View style={[styles.cornerMarker, styles.bottomLeft]} />
          <View style={[styles.cornerMarker, styles.bottomRight]} />

          {/* Scanning Line */}
          {isScanning && (
            <View style={[styles.scanningLine, { top: (scanProgress / 100) * 240 }]} />
          )}

          {/* Face Icon */}
          <View style={styles.faceIconWrapper}>
            <View style={styles.faceIconCircle}>
              <User color="white" size={64} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>
          {scanProgress < 50 ? 'Position your face in the frame' : 'Scanning...'}
        </Text>
        <Text style={styles.instructionsSubtitle}>
          {scanProgress < 50
            ? 'Look directly at the camera and hold still'
            : `${scanProgress}% complete`}
        </Text>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${scanProgress}%` }]} />
        </View>
      </View>

      <View style={styles.paymentInfo}>
        <Text style={styles.paymentInfoText}>Paying to {merchantName}</Text>
        <Text style={styles.paymentInfoAmount}>${paymentAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '45deg' }],
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cameraView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceFrame: {
    width: 288,
    height: 320,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.6)',
    position: 'relative',
    overflow: 'hidden',
  },
  cornerMarker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#818cf8',
  },
  topLeft: {
    top: 16,
    left: 16,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 16,
    right: 16,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 16,
    right: 16,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 12,
  },
  scanningLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#818cf8',
    opacity: 0.7,
  },
  faceIconWrapper: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceIconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  instructions: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  instructionsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  instructionsSubtitle: {
    color: '#d1d5db',
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginTop: 12,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  paymentInfo: {
    backgroundColor: '#1f2937',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentInfoText: {
    color: '#9ca3af',
  },
  paymentInfoAmount: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
});

export default ScanningScreen;
