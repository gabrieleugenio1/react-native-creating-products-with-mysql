import React from "react";
import {css} from "../css/Css";
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Menu(props){


    return(
        <View style={css.menu}>
            <TouchableOpacity style={css.button__voltar} onPress={()=>props.navigation.navigate(props.tela)}>
                <Icon name={props.nomeicone} size={40} color="#FFF"></Icon>
            </TouchableOpacity >
            <Text style={css.menu__title}>{props.title}</Text>    
            </View>
    )
}