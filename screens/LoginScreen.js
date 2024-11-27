import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import supabase from '../SuperbaseConnector';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export default function LoginScreen({ route }) {
    const [Taikhoan, setTaikhoan] = useState()
    const [Matkhau, setMatkhau] = useState();
    const navigation = useNavigation();
    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            Name: Taikhoan,
            Pass: Matkhau,
        })
        if (data) {
            navigation.navigate("Home", { Taikhoan, Matkhau });
        } else {
            alert("Tài khoản không hợp lệ");
        }

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>LOGIN</Text>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TextInput style={styles.txtInput} placeholder='TAI KHOAN' value={Taikhoan} onChangeText={setTaikhoan} />
                <TextInput style={styles.txtInput} placeholder='MAT KHAU' value={Matkhau} onChangeText={setMatkhau} />
            </View>
            <View style={{ marginBottom: 40 }}>
                <Button onPress={handleLogin} title='LOGIN BITCH' />
            </View>
            <View style={{ marginBottom: 40 }}>
                <Button onPress={() => navigation.navigate('Signup')} title='SIGN UP' />
            </View>
            <View >
                <Button onPress={() => navigation.navigate('ForgotPass')} title='FORGOT PASS' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ecc71',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '900'
    },
    txtInput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 50,
        width: "50%",
    }
});