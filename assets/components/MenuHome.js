import React from "react";
import {css} from "../css/Css";
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MenuHome(props){

    async function logout(){
        await AsyncStorage.clear();
        props.navigation.navigate("Login");
    }

    return(
        <View style={css.menu} >
            <TouchableOpacity style={css.button__logout} onPress={()=>logout()}>
                <Icon name={props.iconeleft} size={40} color="#FFF"></Icon>
            </TouchableOpacity >
            <Text style={css.menu__title_home}>{props.title}</Text>    
            <TouchableOpacity style={css.button__contato} onPress={()=>props.navigation.navigate("NovoProduto")}>
                <Icon name={props.iconeright} size={40} color="#FFF"></Icon>
            </TouchableOpacity >
            </View>
    )
}