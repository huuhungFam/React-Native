import { StyleSheet, Text, View, Button, Image, Modal, TextInput, Pressable} from 'react-native';
import supabase from '../SuperbaseConnector';
import { useState } from 'react';
import { EventEmitter } from 'expo';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ForgotPass() {
  const [email, setEmail] = useState()

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };


  const handlePressable = async () => {
    if (isValidEmail(email)) {
      try {
        let { data, error } = await supabase.auth.resetPasswordForEmail(email)
        if (data) {
          console.log('Truy cap doi mail thanh cong')
        }
      } catch (error) {
        console.log('Truy cap doi mail that bai')
      }
    } else {
      alert('Invalid email')
      return
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Recover your password</Text>
      <Text style={styles.text}>You will receive an email to recover your password</Text>
      <TextInput style={{ marginTop: 40, marginBottom: 40, borderWidth: 1, width: "300" }} placeholder='Enter your email' value={email} onChangeText={setEmail} />
      <Pressable
        style={styles.button}
        onPress={() => handlePressable()}>
        <Text style={styles.textStyle}>SUBMIT</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EFBA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '900'
  },
  taikhoan: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: "50%",
  },
  button: {
    alignItems: 'center',
    width: 150,
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    backgroundColor: '#2196F3',
  },
});