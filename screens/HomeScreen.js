import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, Modal, TextInput } from 'react-native';
import supabase from '../SuperbaseConnector';
import { useEffect, useState } from 'react';
export default function HomeScreen({ route }) {
    const [Error, setError] = useState(null)
    const [Data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [Name, setName] = useState()
    const [Age, setAge] = useState();
    const [Email, setEmail] = useState();
    const [Pass, setPass] = useState();
    const { Taikhoan, Matkhau } = route.params;

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('Users')
            .select()
            .eq('Name', Taikhoan)
            .eq('Pass', Matkhau)
            .single()

        if (error) {
            setError("Can not connect to database")
            setData([])
            console.log("LOI cho fetch")
        }
        if (data) {
            setData(data)
            setError('Connecting to database successfully')
            console.log('Fetching successfully')
            setName(data.Name);
            setAge(data.Age);
            setEmail(data.Email);
            setPass(data.Pass);
        }
    }

    const updateData = async (name, age, mail, pass) => {
        const { error } = await supabase
            .from('Users')
            .update({ Name: name, Age: age, Email: mail, Pass: pass })
            .eq('Name', Taikhoan)
            .eq('Pass', Matkhau)


        if (error) {
            setError("Can not update data")
            setData([])
            console.log("LOI cho update")
        } else {
            alert("CAP NHAT THANH CONG")
        }
    }


    const deleteData = async () => {
        const response = await supabase
            .from('Users')
            .delete()
            .eq('Name', Taikhoan)
            .eq('Pass', Matkhau)

        alert("CÚT")
    }

    useEffect(() => {

        fetchData()

    }, [Taikhoan, Matkhau])


    const handleUpdate = () => {
        updateData(Name, Age, Email, Pass)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{Error}</Text>

            <View style={styles.text}>{Data ? (
                <Text>
                    {Data.Name} {Data.Age} {Data.Email} {Data.Pass}
                </Text>
            ) : (
                <Text>No Data Found</Text>
            )}
            </View>
            <StatusBar style="auto" />

            <View>
                <Button title='UPDATE' onPress={() => setVisible(true)} />
                <Button color={'#e74c3c'} title='DELETE' onPress={deleteData} />
            </View>
            <View>
                <Image
                    style={{ height: 350, width: 400 }}
                    source={require('../assets/image.png')}
                />
            </View>
            <Modal visible={visible} onRequestClose={() => setVisible(false)} animationType='fade' presentationStyle='pageSheet'>
                <Text>CAP NHAT THONG TIN</Text>
                <View style={{ flex: 1, backgroundColor: 'lightblue', padding: 60 }}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <TextInput style={styles.txtinput} placeholder='Name' value={Name} onChangeText={setName} />
                        <TextInput style={styles.txtinput} placeholder='Age' value={Age} onChangeText={setAge} />
                        <TextInput style={styles.txtinput} placeholder='Email' value={Email} onChangeText={setEmail} />
                        <TextInput style={styles.txtinput} placeholder='Pass' value={Pass} onChangeText={setPass} />
                    </View>
                    <View>
                        <Button title='UPDATE' onPress={handleUpdate} />
                        <Button title='EXIT' onPress={() => setVisible(false)} />
                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
