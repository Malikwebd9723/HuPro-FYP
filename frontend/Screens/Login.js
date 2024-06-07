import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { Context } from "../context/States";
import { useTheme } from "styled-components";


export default function Login() {
    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;
    const context = useContext(Context)
    const { loggedInStatus, handleLogin } = context;
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [load, setLoad] = useState(false);

    const callHandleLogin = async () => {
        setLoad(true);
        const getRoute = await handleLogin({ email, password });
        if (getRoute.success) {
            navigation.replace(getRoute.route)
        }
        setEmail("");
        setPassword("");
        setLoad(false)
    }
    useEffect(() => {
        // check the user logged in status to navigate according to privilege
        const getRoute = async () => {
            const route = await loggedInStatus();
            if(route){
                navigation.replace(route)
            }
        }
        getRoute();
    }, [])
    return (
        <>
            <ScrollView style={[{ backgroundColor }]}>
                <View style={[styles.firstContainer, { backgroundColor: navBg }]}>
                    <Text style={[styles.h1, { color: colorDark }]}>HuPro</Text>

                    <Text style={[styles.h2, { color: colorDark }]}>Login to your Account</Text>
                </View>

                <KeyboardAvoidingView >
                    {load ? <ActivityIndicator size={30} color={color} /> :
                        <View style={styles.secondContainer}>

                            <TextInput value={email} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Enter your email" keyboardType="email-address" onChangeText={(text) => { setEmail(text) }} />

                            <TextInput value={password} style={[styles.input, { backgroundColor: boxbg }]} placeholder="Password" secureTextEntry={showPass} onChangeText={(text) => { setPassword(text) }} />

                            <TouchableOpacity onPress={() => setShowPass(!showPass)}><Text style={[{ color }]}>{showPass ? "Show Password" : "Hide Password"}</Text></TouchableOpacity>

                            <TouchableOpacity onPress={() => callHandleLogin()} style={styles.loginBtn}>

                                <Text style={styles.loginBtnText}>Login</Text>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
                                <Text style={{ color }}>Forgot password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                                <Text style={{ color }}>Not yet registered?</Text>
                            </TouchableOpacity>

                        </View>}
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
};

const styles = StyleSheet.create({
    firstContainer: { paddingVertical: 50, borderBottomWidth: 1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: "grey" },
    h1: { textAlign: "center", fontSize: 35, fontWeight: "900", color: "black" },
    h2: { textAlign: "center", fontSize: 20, fontWeight: "400", color: "black" },
    secondContainer: { alignItems: "center", gap: 30, paddingVertical: 30 },
    input: { borderWidth: 1, borderRadius: 10, width: "80%", padding: 10, fontSize: 15, color: "black" },
    loginBtn: { backgroundColor: "green", padding: 15, borderRadius: 10, width: "30%", alignItems: "center" },
    loginBtnText: { fontSize: 15 },
})