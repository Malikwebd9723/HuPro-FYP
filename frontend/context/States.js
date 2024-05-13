import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from 'react';
import { ToastAndroid } from "react-native";

const Context = createContext();

const States = ({ children }) => {
    // const homeHost = "192.168.10.12";
    const homeHost = "10.121.28.223";
    const navigation = useNavigation();

    // all the states goes here
    const [notificationData, setNotificationData] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [applicantUsers, setApplicantUsers] = useState([]);
    const [profileData, setProfileData] = useState([])


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
    const handleLogin = async ({ roll, password }) => {
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
                const privilege = json.privilege;
                const id = json.id;
                await AsyncStorage.setItem("authToken", token);
                await AsyncStorage.setItem("privilege", privilege);
                await AsyncStorage.setItem("user", id);
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


    // handling the logout

    const handleLogOut = async()=>{
        await AsyncStorage.clear();
        navigation.navigate("Login");
    }

    const handleSetNotification = async (type,message) => {
        try {
            if (message !== "" && catToShow !== "") {
                const response = await fetch(`http://${homeHost}:8001/setNotification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ type, message })
                });
                const json = await response.json();
                ToastAndroid.show(json.message, ToastAndroid.SHORT);
                setIsModalVisible(!isModalVisible);
            } else {
                ToastAndroid.show("Fill all the fields", ToastAndroid.LONG);
            }
        } catch (error) {
            ToastAndroid.show(json.message, ToastAndroid.LONG)
            setIsModalVisible(!isModalVisible);
        }
    }


        // delete notification from database
        const handleDeleteNotification = async (id) => {
            try {
                const response = await fetch(`http://${homeHost}:8001/deleteNotification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id })
                });
                setMessage(id)
                const json = await response.json();
                ToastAndroid.show(json.message, ToastAndroid.LONG);
            } catch (error) {
                ToastAndroid.show("Error deleting notification", ToastAndroid.LONG)
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

    // get all the registered users
    const getRegisteredUsers = async () => {
        try {
            const response = await fetch(`http://${homeHost}:8001/getRegisteredUsers`)
            const json = await response.json();
            setRegisteredUsers(json.data);
        } catch (error) {
            ToastAndroid.show("Error while fetching registered users", ToastAndroid.LONG)
        }
    }

    // get all the registered users
    const getApplicantUsers = async () => {
        try {
            const response = await fetch(`http://${homeHost}:8001/getApplicantUsers`)
            const json = await response.json();
            setApplicantUsers(json.data);
        } catch (error) {
            ToastAndroid.show("Error while fetching applicants", ToastAndroid.LONG)
        }
    }

    // register a specific user
    const registerSpecificUser = async (id) => {
        try {
            const response = await fetch(`http://${homeHost}:8001/registerSpecificUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            const json = await response.json();
            ToastAndroid.show(json.message, ToastAndroid.LONG)
            getRegisteredUsers();
            getApplicantUsers();
        } catch (error) {
            ToastAndroid.show("Error while register user", ToastAndroid.LONG)
        }
    }

    // register a specific user
    const deleteSpecificUser = async (id) => {
        try {
            const response = await fetch(`http://${homeHost}:8001/deleteSpecificUser`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            const json = await response.json();
            ToastAndroid.show(json.message, ToastAndroid.LONG)
            getRegisteredUsers();
            getApplicantUsers();
        } catch (error) {
            ToastAndroid.show("Error during deletion", ToastAndroid.LONG)
        }
    }

    // search user function
    const searchUser = (text) => {
        if (text !== "") {
            const filtered = registeredUsers.filter((user) =>
                user.roll.includes(text)
            );
            setRegisteredUsers(filtered);
        }
        else (
            getRegisteredUsers()
        )
    };

    const getProfileData = async (id) => {
        try {
            const response = await fetch(`http://${homeHost}:8001/profileData`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            const json = await response.json();
            setProfileData(json.user[0])
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }


    const handleUpdateuser = async (
        {id,
        fullname,
        fathername,
        roll,
        department,
        semester,
        address,
        cnic,
        contact}) => {

        try {


            const response = await fetch(`http://${homeHost}:8001/updateDetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    fullname,
                    fathername,
                    roll,
                    department,
                    semester,
                    address, 
                    cnic,
                    contact})
            });
            const json = await response.json();
            if (json.success == true) {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            } else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)

            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }

    const handleAssignDuty = async({id, duty})=>{
        try {
            const response = await fetch(`http://${homeHost}:8001/assignDuty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id,duty})
            });
            const json = await response.json();
            
            if (json.success !== true) {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }
    return (
        <Context.Provider value={{ loggedInStatus, handleLogin,handleLogOut, handleSetNotification, handleGetNotification, handleDeleteNotification,notificationData, getRegisteredUsers, registeredUsers, getApplicantUsers, applicantUsers, registerSpecificUser, deleteSpecificUser, searchUser, getProfileData, profileData, handleUpdateuser,handleAssignDuty }}>
            {children}
        </Context.Provider>
    );
};

export { Context, States };
