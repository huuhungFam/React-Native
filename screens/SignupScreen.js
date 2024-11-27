import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import supabase from '../SuperbaseConnector';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const insertData = async (name, age, mail, pass) => {
        const { error } = await supabase
            .from('Users')
            .insert({ Name: name, Age: age, Email: mail, Pass: pass })

        if (error) {
            setError("Can not create account")
            setData([])
            console.log("LOI ROI")
        }
    }

    const [Name, setName] = useState()
    const [Age, setAge] = useState();
    const [Email, setEmail] = useState();
    const [Pass, setPass] = useState();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const handleSingup = () => {
        if (!Name || !Age || !Email || !Pass) {
            alert('Vui long nhap du thong tin')
        }
        else {
            if (isValidEmail(Email)) {
                insertData(Name, Age, Email, Pass)
                alert('Tao tai khoan thanh cong')
            } else {
                alert('email khong hop le')
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>SIGNUP</Text>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <TextInput style={styles.txtinput} placeholder='Name' value={Name} onChangeText={setName} />
                <TextInput style={styles.txtinput} placeholder='Age' value={Age} onChangeText={setAge} />
                <TextInput style={styles.txtinput} placeholder='Email' value={Email} onChangeText={setEmail} />
                <TextInput style={styles.txtinput} placeholder='Pass' value={Pass} onChangeText={setPass} />
            </View>
            <View>
                <Button onPress={handleSingup} title='CREATE A BITCH' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '900'
    },
    txtinput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        width: "50%",
    }
});