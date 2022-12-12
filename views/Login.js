import React,{useState} from 'react';
import { KeyboardAvoidingView,TouchableOpacity, Text, View} from 'react-native';
import { Input, Avatar  } from 'react-native-elements';
import {css} from '../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config/config.json'
import axios from 'axios';

export default function Login({navigation}){
    const [display,setDisplay] = useState('none');
    const [nome,setNome] = useState('');
    const [password,setPassword] = useState('');
    
   //Envio do formulário de login
   async function sendForm(){
    await axios.post(`${config.urlRoot}login`,{
        nome: nome,
        password: password   
    }).then(async (response)=>{      
        if (response.data==="Error"){
            setDisplay("flex");
            setTimeout(()=>{setDisplay("none")},5000)
            await AsyncStorage.clear();
        }else{
            await AsyncStorage.setItem('userData',
                JSON.stringify(response.data)
              );                
            navigation.navigate("Home");
        };
    })

};

    return(
        <KeyboardAvoidingView style={[css.container,{ backgroundColor:'#F2F2F2'}]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{alignItems:"center",marginTop:100}}>        
          <Avatar size={130} 
                rounded
                source={require('../assets/img/avatar-icon.jpg')} 
            />
          </View>   
            <View style={css.login_cadastro_contato}>
            <View style={css.inputLogin}>
            <View >
                <Text style={css.login__msg(display)}>Login ou senha inválidos!</Text>
            </View>
            <Text style={{fontSize:25}}>Login</Text>
            <Input style={[css.input,{fontSize:20}]}  onChangeText={text=>setNome(text)} placeholder="Digite seu login" placeholderTextColor={"#000"}/>
            <Text style={{fontSize:25}}>Senha</Text>
            <Input style={[css.input,{fontSize:20}]}  onChangeText={text=>setPassword(text)} placeholder="Digite sua senha" placeholderTextColor={"#000"}
            secureTextEntry={true}  />
                </View>

                <View style={css.botoes}>
                <TouchableOpacity style={css.button} onPress={()=>{
                sendForm();
            }}>
                    <Text style={css.textoBotao}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[css.button,{backgroundColor:"#FF1616"}]} onPress={()=>navigation.navigate('Cadastro')}>
                    <Text style={css.textoBotao}>Cadastre-se</Text>
                </TouchableOpacity>
                </View>          
            </View>
        </KeyboardAvoidingView>


    )
}