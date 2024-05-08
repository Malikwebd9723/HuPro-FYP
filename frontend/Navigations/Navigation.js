import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { States } from "../context/States";
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import Registration from "../Screens/Registration"
import ForgotPass from "../Screens/ForgotPass";
import SuperAdmin from "../Screens/SuperAdmin/SuperAdmin";
import Admin from "../Screens/Admin/Admin";
import User from "../Screens/User";
import userData from "../Screens/SuperAdmin/UsersData";
import { useTheme } from "styled-components";
import Duties from "../Screens/SuperAdmin/Duties";
import Profile from "../Screens/SuperAdmin/profile";
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
            component={userData}
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
            component={Duties}
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
            component={Profile}
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
          <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
        </Stack.Navigator>
      </States>
    </NavigationContainer>
  )
}