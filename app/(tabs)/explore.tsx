import { StyleSheet, Alert, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/AuthContext';

export default function TabTwoScreen() {
  const { handleLogout } = useAuth();

  const onLogout = () => {
    handleLogout().catch((error) => {
      Alert.alert("Logout Gagal", error.message);
    });
  };

  return (
    <LinearGradient
      colors={['#4c004c', '#111111']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
        
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <ThemedText style={styles.logoutButtonText}>LOGOUT</ThemedText>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  contentContainer: {
    width: '80%',
    marginTop: 100,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});