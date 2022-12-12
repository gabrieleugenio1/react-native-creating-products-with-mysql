import React, { useState, useEffect } from "react";
import { TouchableOpacity, KeyboardAvoidingView, Text,View} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";
import { Input } from "react-native-elements";
import { css } from "../../assets/css/Css";
import MenuVoltar from "../../assets/components/MenuVoltar";
import config from "../../config/config.json"

export default function Atualizar({ navigation, route }) {
  const [produto, setProduto] = useState("");
  const [armazenamento, setArmazenamento] = useState("");
  const [valor, setValor] = useState("");
  const id = route.params.id;
  const url = `${config.urlRoot}produto/${id}`;
  const mostrarMensagem = (mensagem) => {
          showMessage({          
          message : 'Sucesso',
          description: mensagem,
          type: 'success',
          style:{height:100},    
          titleStyle:{fontWeight: 'bold',fontSize:20,justifyContent:"center",marginTop:"auto",alignSelf:"center"}         
})    
}
  useEffect(() => {
    axios.get(url).then(response => {
      setProduto(response.data.nome);
      setArmazenamento(response.data.capacidade);
      setValor(response.data.preco);   
      
    });
  }, []);
  
  function atualizarDados() {    
    let novoValor = valor.toString().replace(',','.');     
    console.log(novoValor, armazenamento)
    axios
      .put(url, {
        produto: produto,
        valor: novoValor,
        armazenamento: armazenamento
      })
      .then(function(response) {
        if(response.status=="200"){
          mostrarMensagem("Alterado com sucesso\nRedirecionando...")
          setTimeout(() => {
              navigation.navigate("Home");
            }, 3000);        
          console.log(response)
      }else{
          alert("Falha ao inserir")
      }
      })
      .catch(function(error) {
        alert("Falha ao inserir")
        console.log(error);
      });

      
  }

  function removerDados() {
    axios
      .delete(`${config.urlRoot}produto/${id}`, {
        produto: produto,
        valor: valor,
        armazenamento: armazenamento
      })
      .then(function(response) {
        if(response.status=="200"){
          mostrarMensagem("Removido com sucesso\nRedirecionando...")
          setTimeout(() => {
              navigation.navigate("Home");
            }, 3000);        
          console.log(response)
      }else{
          alert("Falha ao inserir")
      }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <KeyboardAvoidingView
      style={[css.container, { backgroundColor: "#F2F2F2" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MenuVoltar
        navigation={navigation}
        nomeicone="arrow-circle-left"
        tela="Home"
        title="Modificar Produto"
      />

      <View
        style={[
          css.login_cadastro_contato,
          { justifyContent: "flex-start", marginTop: 40 }
        ]}
      > 
      
        <View style={css.inputLogin}>
          <Text style={{ fontSize: 25 }}>Produto</Text>
          <Input
            style={[css.input, { fontSize: 20 }]}
            defaultValue={produto}
            onChangeText={text => setProduto(text)}
            placeholder="Digite o produto"
            placeholderTextColor={"#000"}
          />
          <Text style={{ fontSize: 25 }}>Capacidade</Text>
          <Input
            style={[css.input, { fontSize: 20 }]}
            keyboardType='numeric'
            onChangeText={text => setArmazenamento(text)}
            defaultValue={armazenamento.toString()}
            placeholder="Digite o armazenamento"
            placeholderTextColor={"#000"}
          />
          <Text style={{ fontSize: 25 }}>Preço (R$)</Text>
          <Input
            style={[css.input, { fontSize: 20 }]}
            defaultValue={valor.toString()} keyboardType='numeric'
            onChangeText={text => setValor(text)}
            placeholder="Digite o valor"
            placeholderTextColor={"#000"}
          />
        </View>

        <View style={css.botoes}>
          <TouchableOpacity style={css.button} onPress={() => atualizarDados()}>
            <Text style={css.textoBotao}>Atualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => removerDados()}
            style={[css.button, { backgroundColor: "#FF1616" }]}
          >
            <Text style={css.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlashMessage textStyle={{ fontSize: 20,justifyContent:"center",alignSelf:"center",marginTop:"auto", textAlign:'center'}} duration={3000} position="top" />             

    </KeyboardAvoidingView>
  );
}
