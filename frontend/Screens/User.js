import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";

export default function User(){
    return(
        <ScrollView>
            <View>
                <Text>I am simple user</Text>
                <TouchableOpacity onPress={()=>AsyncStorage.clear()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};