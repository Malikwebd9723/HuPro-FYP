import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from 'react';
import { PermissionsAndroid, ToastAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';

const Context = createContext();

const States = ({ children }) => {
    // const homeHost = "192.168.10.5";
    // const homeHost = "192.168.84.140";
    const homeHost = "https://hu-pro-fyp.vercel.app"
    const navigation = useNavigation();

    // all the states goes here
    const [notificationData, setNotificationData] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [applicantUsers, setApplicantUsers] = useState([]);
    const [profileData, setProfileData] = useState([])
    const [location, setLocation] = useState(false);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('granted', granted);
            if (granted === 'granted') {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };
    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
            console.log('res is:', res);
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        setLocation(position);
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
    };



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
    const handleLogin = async ({ email, password }) => {
        try {
            const response = await fetch(`${homeHost}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
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
            ToastAndroid.show("Network Error!", ToastAndroid.LONG)
        }
    }
    const handleForgotPassword = async ({ email }) => {
        try {
            const response = await fetch(`${homeHost}/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
    
            const json = await response.json();
            if (json.success) {
                ToastAndroid.show(json.message, ToastAndroid.LONG);
            } else {
                ToastAndroid.show(json.message, ToastAndroid.LONG);
            }
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }

    const handlePasswordChange = async ({ id, oldPwd, newPwd }) => {
        try {
            const response = await fetch(`${homeHost}/changePassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, oldPwd, newPwd })
            });
            const json = await response.json();
            if (json.success) {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }
            else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }
        } catch (error) {
            console.log(`error changing password,${error.message}`);
        }
    }

    // handling the logout

    const handleLogOut = async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("privilege");
        await AsyncStorage.removeItem("user");
        navigation.navigate("Login");
    }

    // delete notification from database
    const handleDeleteNotification = async (id) => {
        try {
            const response = await fetch(`${homeHost}/deleteNotification`, {
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
            const response = await fetch(`${homeHost}/getNotification`)
            const json = await response.json();
            setNotificationData(json);
        } catch (error) {
            ToastAndroid.show("Error while fetching notification", ToastAndroid.LONG)
        }
    }

    // get all the registered users
    const getRegisteredUsers = async () => {
        try {
            const response = await fetch(`${homeHost}/getRegisteredUsers`)
            const json = await response.json();
            await setRegisteredUsers(json.data);
        } catch (error) {
            ToastAndroid.show("Error while fetching registered users", ToastAndroid.LONG)
        }
    }

    // get all the registered users
    const getApplicantUsers = async () => {
        try {
            const response = await fetch(`${homeHost}/getApplicantUsers`)
            const json = await response.json();
            await setApplicantUsers(json.data);
        } catch (error) {
            ToastAndroid.show("Error while fetching applicants", ToastAndroid.LONG)
        }
    }

    // register a specific user
    const registerSpecificUser = async (id) => {
        try {
            const response = await fetch(`${homeHost}/registerSpecificUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            const json = await response.json();
            ToastAndroid.show(json.message, ToastAndroid.LONG)
            await getRegisteredUsers();
            await getApplicantUsers();
        } catch (error) {
            ToastAndroid.show("Error while register user", ToastAndroid.LONG)
        }
    }

    // register a specific user
    const deleteSpecificUser = async (id) => {
        try {
            const response = await fetch(`${homeHost}/deleteSpecificUser`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            const json = await response.json();
            ToastAndroid.show(json.message, ToastAndroid.LONG)
            await getRegisteredUsers();
            await getApplicantUsers();
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
            const response = await fetch(`${homeHost}/profileData`, {
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
        { id,
            fullname,
            fathername,
            roll,
            department,
            semester,
            address,
            cnic,
            contact }) => {

        try {


            const response = await fetch(`${homeHost}/updateDetails`, {
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
                    contact
                })
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

    const handleAssignDuty = async ({ id, duty }) => {
        try {
            const response = await fetch(`${homeHost}/assignDuty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, duty })
            });
            const json = await response.json();

            if (json.success !== true) {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }

    const handleCheckIn = async ({ id, date, latitude, longitude }) => {
        try {
            const response = await fetch(`${homeHost}/checkIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, date, latitude, longitude })
            });
            const json = await response.json();

            if (json.success == true) {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }
            else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }

    const handleCheckOut = async ({ id, date, latitude, longitude }) => {
        try {
            const response = await fetch(`${homeHost}/checkOut`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, date, latitude, longitude })
            });
            const json = await response.json();

            if (json.success == true) {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }
            else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }

    const handleAttendance = async ({ id, date, status }) => {
        try {
            const response = await fetch(`${homeHost}/attendance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, date, status })
            });
            const json = await response.json();

            if (json.success == true) {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }
            else {
                ToastAndroid.show(json.message, ToastAndroid.LONG)
            }

        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
        }
    }

    return (
        <Context.Provider value={{ loggedInStatus, handleLogin, handleForgotPassword,handlePasswordChange, handleLogOut, handleGetNotification, handleDeleteNotification, notificationData, getRegisteredUsers, registeredUsers, getApplicantUsers, applicantUsers, registerSpecificUser, deleteSpecificUser, searchUser, getProfileData, profileData, handleUpdateuser, handleAssignDuty, getLocation, location, handleCheckIn, handleCheckOut, handleAttendance }}>
            {children}
        </Context.Provider>
    );
};

export { Context, States };
