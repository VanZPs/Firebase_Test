import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Link, useRouter } from 'expo-router';

// 1. Impor 'db' dan fungsi firestore
import { db } from '@/config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'; 

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Tambahkan state baru untuk data mahasiswa
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [jurusan, setJurusan] = useState('');

  const { handleRegister } = useAuth();
  const router = useRouter();

  // 3. Modifikasi fungsi onRegister
  const onRegister = async () => {
    if (email === '' || password === '' || nama === '' || nim === '' || jurusan === '') {
      Alert.alert('Error', 'Semua field tidak boleh kosong.');
      return;
    }

    try {
      // Langkah 1: Buat akun di Authentication
      const userCredential = await handleRegister(email, password);
      const user = userCredential.user;
      
      console.log('Akun Auth berhasil dibuat:', user.uid);

      // Langkah 2: Buat dokumen di Firestore Database
      await setDoc(doc(db, "mahasiswa", user.uid), {
        nama: nama,
        nim: nim,
        jurusan: jurusan,
        email: email // Simpan email juga di database
      });

      console.log('Dokumen mahasiswa berhasil dibuat di Firestore');

      // Langkah 3: Beri notifikasi dan pindah halaman
      Alert.alert(
        'Registrasi Berhasil',
        'Akun Anda telah dibuat. Silakan login.',
        [
          { text: 'OK', onPress: () => router.replace('/login') }
        ]
      );

    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Registrasi Gagal', 'Email ini sudah terdaftar.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Registrasi Gagal', 'Password terlalu lemah. Minimal 6 karakter.');
      } else {
        Alert.alert('Registrasi Gagal', error.message);
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>Buat Akun Baru</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          value={nama}
          onChangeText={setNama}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="NIM (Nomor Induk Mahasiswa)"
          value={nim}
          onChangeText={setNim}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Jurusan (Contoh: Teknik Informatika)"
          value={jurusan}
          onChangeText={setJurusan}
          placeholderTextColor="#888"
        />
        
        <View style={styles.separator} />

        <TextInput
          style={styles.input}
          placeholder="Masukkan Email Anda"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Buat Password (Min. 6 karakter)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
        
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={onRegister} color="#841584" />
        </View>

        <Link href="/login" asChild>
          <TouchableOpacity style={styles.linkContainer}>
            <ThemedText type="link">Sudah punya akun? Login di sini</ThemedText>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: 'gray', 
    backgroundColor: 'white',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  }
});