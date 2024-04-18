import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context/States";


export default function Login() {
    const context = useContext(Context)
    const {loggedInStatus,handleLogin} = context;
    const navigation = useNavigation();
    const [roll, setRoll] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        // check the user logged in status to navigate according to privilege
        loggedInStatus();
    }, [])
    return (
        <>
            <ScrollView>
                <View style={styles.firstContainer}>
                    <Text style={styles.h1}>HuPro</Text>

                    <Text style={styles.h2}>Login to your Account</Text>
                </View>

                <KeyboardAvoidingView >
                    <View style={styles.secondContainer}>

                        <TextInput style={styles.input} placeholder="Roll No" keyboardType="numeric" onChangeText={(text) => { setRoll(text) }} />

                        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />

                        <TouchableOpacity onPress={()=>handleLogin({roll, password})} style={styles.loginBtn}>

                            <Text style={styles.loginBtnText}>Login</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
                            <Text style={{ color: "blue" }}>Forgot password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                            <Text style={{ color: "blue" }}>Not yet registered?</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    firstContainer: { paddingVertical: 50, borderBottomWidth: 1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,backgroundColor:"grey" },
    h1: { textAlign: "center", fontSize: 35, fontWeight: "900",color:"black" },
    h2: { textAlign: "center", fontSize: 20, fontWeight: "400",color:"black" },
    secondContainer: { alignItems: "center", gap: 30, paddingVertical: 30 },
    input: { borderWidth: 1, borderRadius: 10, width: "80%", padding: 10, fontSize: 15,backgroundColor:"grey",color:"black" },
    loginBtn: { backgroundColor: "green", padding: 15, borderRadius: 10, width: "30%", alignItems: "center" },
    loginBtnText: { fontSize: 15 },
})