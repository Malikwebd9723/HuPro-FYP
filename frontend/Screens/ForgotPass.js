import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


export default function ForgotPass() {
    const[email,setEmail] = useState("")
    const navigation = useNavigation();
    const homeHost = "192.168.10.14";


    const handlesubmit = async ()=>{
        
        // () => navigation.navigate("Login")
        const response = await fetch(`http://${homeHost}:8001/forgotpassword`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        });

        const json = await response.json();
        if (json.success) {
            ToastAndroid.show(json.message,ToastAndroid.LONG)
            navigation.navigate("Login")
        } else {
            ToastAndroid.show(json.message,ToastAndroid.LONG)
        }
    }
    return (
        <>
            <ScrollView>
                <View style={styles.firstContainer}>
                    <Text style={styles.h1}>HuPro</Text>

                    <Text style={styles.h2}>Verify yourself</Text>
                </View>

                <KeyboardAvoidingView >
                    <View style={styles.secondContainer}>
                        <Text style={styles.text}>To reset password your email should be verified by HuPro</Text>

                        <TextInput style={styles.input} onChangeText={(text=>setEmail(text))} placeholder="Email Address" keyboardType="email-address" />

                        <TouchableOpacity onPress={handlesubmit} style={styles.loginBtn}>

                            <Text style={styles.loginBtnText}>Submit</Text>

                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    firstContainer: { paddingVertical: 50,borderBottomWidth:1, borderRadius:20 },
    h1: { textAlign: "center", fontSize: 35, fontWeight: "900" },
    h2: { textAlign: "center", fontSize: 20, fontWeight: "400" },
    text:{color:"red"},
    secondContainer: { alignItems: "center", gap: 30, paddingVertical: 30 },
    input: { borderWidth: 1, borderRadius: 10, width: "80%", padding: 10, fontSize: 15 },
    loginBtn: { backgroundColor: "green", padding: 15, borderRadius: 10, width: "30%", alignItems: "center" },
    loginBtnText: { fontSize: 15, color:"white" },
})