import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from 'react';
import { ToastAndroid } from "react-native";

const Context = createContext();

const States = ({ children }) => {
    const homeHost = "192.168.10.8";
    const navigation = useNavigation();

    // all the states goes here
    const [notificationData, setNotificationData] = useState([])

    // check the user login status
    const loggedInStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            const privilege = await AsyncStorage.getItem("privilege")
            if (token) {
                navigation.navigate(privilege)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // login Route for any user
    const handleLogin = async ({roll, password}) => {
        try {
            const response = await fetch(`http://${homeHost}:8001/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roll, password })
            });
            const json = await response.json();
            if (json.success) {
                const token = json.token;
                const privilege =json.privilege;
                await AsyncStorage.setItem("authToken", token);
                await AsyncStorage.setItem("privilege", privilege);
                navigation.navigate(privilege);
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }
            else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }

    // get all the notification
    const handleGetNotification = async () => {
        try {
            const response = await fetch(`http://${homeHost}:8001/getNotification`)
            const json = await response.json();
            setNotificationData(json);
        } catch (error) {
            ToastAndroid.show("Error while fetching notification", ToastAndroid.LONG)
        }
    }
    return (
        <Context.Provider value={{ loggedInStatus,handleLogin, handleGetNotification,notificationData}}>
            {children}
        </Context.Provider>
    );
};

export { Context, States };
