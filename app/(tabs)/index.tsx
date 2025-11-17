import { StyleSheet, ActivityIndicator, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen() {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'mahasiswa', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const fullName = docSnap.data().nama;
            const nameParts = fullName.split(' ');
            setFirstName(nameParts[0]);
          } else {
            setFirstName('Mahasiswa');
          }
        } catch (error) {
          console.error("Error mengambil data user:", error);
          setFirstName('Tamu');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const textColor = '#FFFFFF';

  return (
    <LinearGradient
      colors={['#4c004c', '#111111']}
      style={styles.gradientContainer}
    >
      <View style={styles.titleContainer}>
        <ThemedText 
          type="title" 
          style={[styles.titleText, { color: textColor }]}
        >
          Selamat datang
        </ThemedText>
        <HelloWave />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={textColor} />
      ) : (
        <ThemedText 
          type="subtitle" 
          style={[styles.nameText, { color: textColor }]}
        >
          {firstName}!
        </ThemedText>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'transparent',
  },
  titleText: {
    fontSize: 35,
    fontWeight: '600',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 35,
    marginTop: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});