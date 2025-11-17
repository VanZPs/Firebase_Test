import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { db } from '@/config/firebaseConfig';
import { collection, onSnapshot, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

interface Mahasiswa {
  id: string;
  nama: string;
  nim: string;
  jurusan: string;
}

export default function MahasiswaScreen() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Mahasiswa[]>([]);

  useEffect(() => {
    const subscriber = onSnapshot(collection(db, 'mahasiswa'), (querySnapshot) => {
      const studentsList: Mahasiswa[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        studentsList.push({
          id: doc.id,
          nama: data.nama || 'N/A',
          nim: data.nim || 'N/A',
          jurusan: data.jurusan || 'N/A',
        });
      });
      setStudents(studentsList);
      setLoading(false);
    });
    return () => subscriber();
  }, []);

  return (
    <LinearGradient
      colors={['#4c004c', '#111111']}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Daftar Mahasiswa
        </ThemedText>
        
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ThemedView style={styles.itemContainer}>
                <ThemedText type="defaultSemiBold" style={styles.itemText}>
                  {item.nama}
                </ThemedText>
                <ThemedText style={styles.itemTextSmall}>NIM: {item.nim}</ThemedText>
                <ThemedText style={styles.itemTextSmall}>Jurusan: {item.jurusan}</ThemedText>
              </ThemedView>
            )}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    marginBottom: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#rgba(255, 255, 255, 0.2)',
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  itemTextSmall: {
    color: '#DDDDDD',
  },
});