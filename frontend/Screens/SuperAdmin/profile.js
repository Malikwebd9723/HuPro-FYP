import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TopNav from "../../components/TopNav";
import { useTheme } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/States";


export default function Profile() {
    const context = useContext(Context);
    const {profileData} = context;

    const theme = useTheme();
    const color = theme.text;
    const backgroundColor = theme.bg;
    const boxbg = theme.boxBg;
    const navBg = theme.navBg;
    const colorDark = theme.textDark;

    return (
        <View style={[styles.mainContainer, { backgroundColor }]}>
            <TopNav text="Profile" />
            <ScrollView>
                <View style={[styles.nameContainer]}>
                    <Text style={[styles.name,{color}]}>{profileData.fullname.toUpperCase()}</Text>
                    <TouchableOpacity onPress={()=>AsyncStorage.clear()}><Text style={[{color}]}>LogOut</Text></TouchableOpacity>
                </View>

                {profileData.emailVerified == false ? <Text style={[{color:"red",paddingBottom:10}]}>Your email is not verified, check your G-mail.</Text>:""}

                <View style={[styles.detailsContainer,{borderColor:color}]}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={[{color,flex:1}]}>Profile Settings</Text>
                    <TouchableOpacity><Text style={[styles.updateBtn,{backgroundColor:boxbg, color:colorDark}]}>Update</Text></TouchableOpacity>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Acces:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.privilege}</Text>
                    </View>

                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Father Name:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.fathername}</Text>
                    </View>
                    
                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Gender:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.gender}</Text>
                    </View>
                    
                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Email:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.email}</Text>
                    </View>
                    
                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Roll#:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.roll}</Text>
                    </View>
                    
                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Department:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.department}</Text>
                    </View>
                    
                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Semester:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.semester}</Text>
                    </View>
                    
                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>CNIC#:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.cnic}</Text>
                    </View>
                    
                    <View style={[styles.detailsContainerInner]}>
                        <Text style={[styles.keys,{color}]}>Contact#:</Text>
                        <Text style={[styles.values,{backgroundColor:boxbg,color:colorDark}]}>{profileData.contact}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};


const styles = StyleSheet.create({
    mainContainer: { padding: 10,paddingBottom:"20%", minHeight: "100%" },
    nameContainer:{marginVertical:20,flexDirection:"row", alignItems:"center", justifyContent:"space-between"},
    name:{fontSize:30},

    updateBtn:{flex:1,padding:5,borderRadius:10,margin:10},

    detailsContainer:{borderWidth:1, borderRadius:10, padding:10},
    detailsContainerInner:{flexDirection:"row",alignItems:"center"},
    keys:{fontWeight:"400",flex:1},
    values:{flex:3,padding:10,margin:10,fontWeight:"600",borderRadius:20},
})