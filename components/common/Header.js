import { User } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = ({ title, onBack, showUserIcon = true }) => {
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <View style={styles.backArrow} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backPlaceholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      {showUserIcon ? (
        <View style={styles.userIconWrapper}>
          <User color="white" size={24} />
        </View>
      ) : (
        <View style={styles.userIconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 48, // roughly like mt-12
    marginBottom: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#475569', // gray-600
    transform: [{ rotate: '45deg' }],
  },
  backPlaceholder: {
    width: 28, // same width as backButton to keep spacing consistent
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b', // gray-800
    textAlign: 'center',
    flex: 1,
  },
  userIconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: '#4f46e5', // indigo-600
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconPlaceholder: {
    width: 40,
    height: 40,
  },
});

export default Header;
