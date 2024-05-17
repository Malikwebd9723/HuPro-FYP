import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { useTheme } from "styled-components";
import { Context } from "../context/States";

export default function ForgotPass() {
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;
    const context = useContext(Context)
    const {handleForgotPassword} = context;

    const[email,setEmail] = useState("")
    const navigation = useNavigation();
    const homeHost = "192.168.10.14";

    return (
        <>
            <ScrollView>
                <View style={[styles.firstContainer,{backgroundColor:navBg}]}>
                    <Text style={[styles.h1,{color:colorDark}]}>HuPro</Text>

                    <Text style={[styles.h2,{color:colorDark}]}>Verify yourself</Text>
                </View>

                <KeyboardAvoidingView >
                    <View style={styles.secondContainer}>
                        <Text style={styles.text}>To reset password your email should be verified by HuPro</Text>

                        <TextInput style={[styles.input,{backgroundColor:boxbg}]} onChangeText={(text=>setEmail(text))} placeholder="Email Address" keyboardType="email-address" />

                        <TouchableOpacity onPress={()=>handleForgotPassword({email})} style={styles.loginBtn}>

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