import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { States } from "../context/States";
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import Registration from "../Screens/Registration"
import ForgotPass from "../Screens/ForgotPass";

import SuperAdmin from "../Screens/SuperAdmin/SuperAdmin";
import SuperAdminUserData from "../Screens/SuperAdmin/UsersData";
import SuperAdminDuties from "../Screens/SuperAdmin/Duties";
import SuperAdminProfile from "../Screens/SuperAdmin/profile";

import Admin from "../Screens/Admin/Admin";
import AdminUserData from "../Screens/Admin/UsersData";
import AdminDuties from "../Screens/Admin/Duties";
import AdminProfile from "../Screens/Admin/profile";
import AddDuties from "../Screens/Admin/AddDuties"

import User from "../Screens/user/User";
import Attendance from "../Screens/user/Attendance"
import { useTheme } from "styled-components";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"


export default function StackNavigator() {
  const theme = useTheme();
  const backgroundColor = theme.bg;
  const boxbg = theme.boxBg;
  const navBg = theme.navBg;
  const colorDark = theme.textDark;
  const color = theme.text;
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  const SuperAdminTabNavigator = () => {
    return (
      <States>
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor, color } }}>
          <Tab.Screen
            name="Home"
            component={SuperAdmin}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="home" size={25} color={color} />
                ) : (
                  <Ionicons name="home" size={25} color={boxbg} />
                )
            }}

          />
          <Tab.Screen
            name="Users"
            component={SuperAdminUserData}
            options={{
              tabBarLabel: "Proctors",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="users" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="users" size={25} color={boxbg} />
                )
            }}
          />
          <Tab.Screen
            name="Duties"
            component={SuperAdminDuties}
            options={{
              tabBarLabel: "Duties",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="clipboard-list" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="clipboard-list" size={25} color={boxbg} />
                )
            }}
          />
          <Tab.Screen
            name="Profile"
            component={SuperAdminProfile}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="user-circle" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="user-circle" size={25} color={boxbg} />
                )
            }}
          />
        </Tab.Navigator>
      </States>
    );
  }


  const AdminTabNavigator = () => {
    return (
      <States>
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor, color } }}>
          <Tab.Screen
            name="Home"
            component={Admin}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="home" size={25} color={color} />
                ) : (
                  <Ionicons name="home" size={25} color={boxbg} />
                )
            }}

          />
          <Tab.Screen
            name="Users"
            component={AdminUserData}
            options={{
              tabBarLabel: "Proctors",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="users" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="users" size={25} color={boxbg} />
                )
            }}
          />
          <Tab.Screen
            name="Duties"
            component={AdminDuties}
            options={{
              tabBarLabel: "Duties",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="clipboard-list" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="clipboard-list" size={25} color={boxbg} />
                )
            }}
          />
          <Tab.Screen
            name="Assign Duties"
            component={AddDuties}
            options={{
              tabBarLabel: "Assign Duties",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="flag-checkered" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="flag-checkered" size={25} color={boxbg} />
                )
            }}
          />
          <Tab.Screen
            name="Profile"
            component={AdminProfile}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="user-circle" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="user-circle" size={25} color={boxbg} />
                )
            }}
          />
        </Tab.Navigator>
      </States>
    );
  }

  const UserTabNavigator = () => {
    return (
      <States>
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor, color } }}>
          <Tab.Screen
            name="Home"
            component={User}
            options={{
              tabBarLabel: "Home",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="home" size={25} color={color} />
                ) : (
                  <Ionicons name="home" size={25} color={boxbg} />
                )
            }}

          />
          <Tab.Screen
            name="Attendance"
            component={Attendance}
            options={{
              tabBarLabel: "Attendance",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="user-check" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="user-check" size={25} color={boxbg} />
                )
            }}
          />
          <Tab.Screen
            name="Duties"
            component={SuperAdminDuties}
            options={{
              tabBarLabel: "Duties",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="clipboard-list" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="clipboard-list" size={25} color={boxbg} />
                )
            }}
          />
          <Tab.Screen
            name="Profile"
            component={SuperAdminProfile}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "#008E97" },
              headerShown: false,
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <FontAwesome5 name="user-circle" size={25} color={color} />
                ) : (
                  <FontAwesome5 name="user-circle" size={25} color={boxbg} />
                )
            }}
          />
        </Tab.Navigator>
      </States>
    );
  }

  return (
    <NavigationContainer>
      <States>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} options={{ headerShown: false }} />
          <Stack.Screen name="SuperAdmin" component={SuperAdminTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={AdminTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={UserTabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </States>
    </NavigationContainer>
  )
}