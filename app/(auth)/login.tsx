import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password123') {
      login({ email });
      router.replace('/(tabs)');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2074' }}
          style={styles.headerImage}
        />
        
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          testID="email-input"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          testID="password-input"
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
          testID="login-button"
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('/signup')}
          testID="signup-link"
        >
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
  error: {
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
});