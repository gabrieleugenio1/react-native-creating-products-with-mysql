import React,{useState  } from 'react';
import { KeyboardAvoidingView,TouchableOpacity, Text, View} from 'react-native';
import FlashMessage, { showMessage} from "react-native-flash-message";
import axios from 'axios';
import { Input } from 'react-native-elements';
import {css} from '../assets/css/Css';
import Menu from '../assets/components/MenuVoltar';
import config from "../config/config.json"

export default function Cadastro({navigation}){ 
    const [nome,setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const mostrarMensagem = () => {

        showMessage({          
        message : 'Sucesso',
        description:"Novo usuário cadastrado\nRedirecionando...",
        type: 'success',
        style:{height:100},    
        titleStyle:{fontWeight: 'bold',fontSize:20,justifyContent:"center",marginTop:"auto",alignSelf:"center"} 
    
       
    })    
    }
      //Envio do formulário de cadastro
      async function sendForm(){
        await axios.post(`${config.urlRoot}create`,{
            nome: nome,
            email: email,
            password: password   
        }).then((response)=>{
            if(response.status=="200"){
                mostrarMensagem()
                setTimeout(() => {
                    navigation.navigate("Login");
                  }, 3000);
             
            }else{
                alert("Falha ao inserir")
            }
        }).catch((error)=>{
            alert("Falha ao inserir")
            console.log(error); 
        })
       
    
    };
    return(
        <KeyboardAvoidingView style={[css.container,{backgroundColor:'#F2F2F2'}]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
         <Menu navigation={navigation}  nomeicone="arrow-circle-left" tela="Login" title="Cadastro usuário"/>

          <View style={[css.login_cadastro_contato,{justifyContent:"flex-start",marginTop:40}]}>
              <View style={css.inputLogin}>
          <Text style={{fontSize:25}}>Login</Text>
          <Input style={[css.input,{fontSize:20}]} placeholder="Digite seu login" placeholderTextColor={"#000"}  onChangeText={text=>setNome(text)}/>
          <Text style={{fontSize:25}}>Email</Text>
          <Input style={[css.input,{fontSize:20}]} placeholder="Digite seu email" placeholderTextColor={"#000"}  onChangeText={text=>setEmail(text)}/>
          <Text style={{fontSize:25}}>Senha</Text>
          <Input style={[css.input,{fontSize:20}]} placeholder="Digite sua senha" placeholderTextColor={"#000"} 
          onChangeText={text=>{setPassword(text)}}  secureTextEntry={true}  />
              </View>

              <View style={css.botoes}>
              <TouchableOpacity onPress={()=>{sendForm()}} style={css.button}>
                  <Text style={css.textoBotao}>Criar conta</Text>
              </TouchableOpacity>

              </View>
        
          </View>
          <FlashMessage textStyle={{ fontSize: 20,justifyContent:"center",alignSelf:"center",marginTop:"auto", textAlign:'center'}} duration={3000} position="top" />             

      </KeyboardAvoidingView>

    )
    }