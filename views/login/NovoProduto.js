import React, { useState } from 'react';
import { TouchableOpacity,KeyboardAvoidingView,Text, View} from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import FlashMessage, { showMessage} from "react-native-flash-message";
import {css} from '../../assets/css/Css';
import MenuVoltar from '../../assets/components/MenuVoltar';
import config from "../../config/config.json"



export default function NovoProduto({navigation}){ 
    const [produto, setProduto] = useState('');
    const [armazenamento, setArmazenamento] = useState('');
    const [valor, setValor] = useState('');


    const mostrarMensagem = () => {

        showMessage({          
        message : 'Sucesso',
        description:"Novo produto cadastrado\nRedirecionando...",
        type: 'success',
        style:{height:100},    
        titleStyle:{fontWeight: 'bold',fontSize:20,justifyContent:"center",marginTop:"auto",alignSelf:"center"} 
    
       
    })    
    }

    function inserirDados(){
        let novoValor = valor.replace(',','.')       
        axios.post(`${config.urlRoot}createproduto`
        , {produto: produto,
        armazenamento: armazenamento,
        valor: novoValor
        }).then(function (response) {
        if(response.status=="200"){
            mostrarMensagem()
            setTimeout(() => {
                navigation.navigate("Home");
              }, 3000);
          
            console.log(response)
        }else{
            alert("Falha ao inserir")
        }        
        console.log(response);
        }).catch(function (error) {
            alert("Falha ao inserir")
            console.log(error);   
             
        });    
        }

    return(
        <KeyboardAvoidingView style={[css.container,{backgroundColor:'#F2F2F2'}]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <MenuVoltar navigation={navigation} nomeicone="arrow-circle-left" tela="Home" title="Cadastro de Produtos"/>
            

          <View style={[css.login_cadastro_contato,{justifyContent:"flex-start",marginTop:40}]}>
              <View style={css.inputLogin}>
          <Text style={{fontSize:25}}>Produto</Text>
          <Input style={[css.input,{fontSize:20}]} onChangeText={(text)=> setProduto(text)} placeholder="Digite o produto" placeholderTextColor={"#000"}/>
          <Text style={{fontSize:25}}>Capacidade</Text>
          <Input style={[css.input,{fontSize:20}]} keyboardType='numeric' onChangeText= {(text) => setArmazenamento(text)} placeholder="Digite o armazenamento" placeholderTextColor={"#000"}/>
          <Text style={{fontSize:25}}>Preço (R$) </Text>
          <Input style={[css.input,{fontSize:20}]} keyboardType='numeric' onChangeText={(text) => setValor(text)
        } placeholder="Digite o valor" placeholderTextColor={"#000"}/>
              </View>

              
              <View style={css.botoes}>
              <TouchableOpacity style={css.button} onPress={()=>inserirDados()}>
                  <Text style={[css.textoBotao]}>Salvar Produto</Text>
              </TouchableOpacity>

              </View>
              
             
          </View>
          <FlashMessage textStyle={{ fontSize: 20,justifyContent:"center",alignSelf:"center",marginTop:"auto", textAlign:'center'}} duration={3000} position="top" />             
      </KeyboardAvoidingView>




    )
}