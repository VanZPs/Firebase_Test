import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useAuth();

  const onLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Email dan password tidak boleh kosong.');
      return;
    }

    handleLogin(email, password)
      .then(() => {
        console.log('Login berhasil');
      })
      .catch((error) => {
         if (error.code === 'auth/invalid-credential') {
          Alert.alert('Login Gagal', 'Email atau password salah.');
        } else {
          Alert.alert('Login Gagal', error.message);
        }
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Selamat Datang!</ThemedText>
      <ThemedText style={styles.subtitle}>Silakan login untuk melanjutkan</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Email Anda"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password Anda"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={onLogin} />
      </View>

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.linkContainer}>
          <ThemedText type="link">Belum punya akun? Daftar di sini</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 32,
    color: 'gray',
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
  buttonContainer: {
    marginTop: 10,
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
  }
});