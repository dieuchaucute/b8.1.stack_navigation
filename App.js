import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { useState } from 'react';

// NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ======================
// LOGIN SCREEN
// ======================
function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // FORMAT
  const formatPhone = (text) => {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 10) {
      cleaned = cleaned.slice(0, 10);
    }

    if (cleaned.length > 6) {
      return (
        cleaned.slice(0, 4) +
        ' ' +
        cleaned.slice(4, 7) +
        ' ' +
        cleaned.slice(7)
      );
    } else if (cleaned.length > 3) {
      return cleaned.slice(0, 4) + ' ' + cleaned.slice(4);
    }

    return cleaned;
  };

  // VALIDATE
  const validatePhone = (rawPhone) => {
    const phoneRegex = /^0[0-9]{9}$/;

    if (rawPhone.length === 0) {
      return 'Vui lòng nhập số điện thoại';
    }

    if (!phoneRegex.test(rawPhone)) {
      return 'Số điện thoại không đúng định dạng';
    }

    return '';
  };

  // INPUT
  const handleChange = (text) => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    const rawPhone = formatted.replace(/\s/g, '');

    if (rawPhone.length > 0) {
      setError(validatePhone(rawPhone));
    } else {
      setError('');
    }
  };

  // BUTTON
  const handleContinue = () => {
    const rawPhone = phone.replace(/\s/g, '');
    const err = validatePhone(rawPhone);

    if (err) {
      setError(err);
      return;
    }

    // 👉 CHUYỂN MÀN HÌNH
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>

      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
      </Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={handleChange}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

// ======================
// HOME SCREEN
// ======================
function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.homeText}>🏠 Trang chủ</Text>
    </View>
  );
}

// ======================
// ROOT
// ======================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ======================
// STYLE
// ======================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
  },

  desc: {
    fontSize: 13,
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },

  inputError: {
    borderBottomColor: 'red',
  },

  errorText: {
    color: 'red',
    marginTop: 5,
  },

  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});