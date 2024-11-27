import { StyleSheet, Text, View, Button, Image, Modal, TextInput, Pressable } from 'react-native';
import supabase from '../SuperbaseConnector';
import { useState } from 'react';
import { EventEmitter } from 'expo';


export default function ResetPasswordScreen({ route }) {
    const token = route.params?.token;
    console.log("Token:", token);
    const [email, setEmail] = useState()
    const [newPass, setNewPass] = useState()

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };


    const UpdateUser = async () => {
        if (isValidEmail(email)) {
            alert('eeeeee')
            try {
                const { data, error } = await supabase.auth.updateUser({
                    access_token: token,
                    email: email,
                    password: newPass,
                })

                if (data) {
                    console.log('Update lai mk moi sau khi mail thanh cong')
                }
            } catch (error) {
                console.log('Update lai mk moi that bai roi')
            }
        } else {
            alert('Invalid email')
            return
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Recover your password</Text>
            <Text style={styles.text}>You will receive an email to recover your password</Text>
            <Text style={[styles.text, {marginTop:30}]}>Token: {token}</Text>
            <TextInput style={{ marginTop: 40, marginBottom: 40, borderWidth: 1, width: "300" }} placeholder='Enter your email' value={email} onChangeText={setEmail} />
            <TextInput style={{ marginTop: 15, marginBottom: 40, borderWidth: 1, width: "300" }} placeholder='Enter your new password' value={newPass} onChangeText={setNewPass} />
            <Pressable
                style={styles.button}
                onPress={() => UpdateUser()}>
                <Text style={styles.textStyle}>UPDATE</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9b59b6',
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

// export default function ResetPasswordScreen(){
//     const [email, setEmail] = useState('');
//     const [newPass, setNewPass] = useState('');
  
//     const handleResetPassword = async () => {
//       if (email && newPass) {
//         try {
//           const { data, error } = await supabase.auth.api.updateUser({ email, password: newPass });
//           if (data) {
//             console.log('Mật khẩu đã được cập nhật');
//           }
//         } catch (error) {
//           console.error('Có lỗi khi cập nhật mật khẩu:', error);
//         }
//       } else {
//         alert('Vui lòng nhập đầy đủ thông tin');
//       }
//     };
  
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Đặt lại mật khẩu</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Nhập email"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Nhập mật khẩu mới"
//           secureTextEntry
//           value={newPass}
//           onChangeText={setNewPass}
//         />
//         <Pressable style={styles.button} onPress={handleResetPassword}>
//           <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
//         </Pressable>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F8EFBA',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     text: {
//       fontSize: 20,
//       fontWeight: '900',
//     },
//     input: {
//       marginTop: 20,
//       borderWidth: 1,
//       padding: 10,
//       width: 250,
//     },
//     button: {
//       marginTop: 20,
//       padding: 10,
//       backgroundColor: '#2196F3',
//       borderRadius: 10,
//     },
//     buttonText: {
//       color: 'white',
//       fontSize: 16,
//     },
//   });
  