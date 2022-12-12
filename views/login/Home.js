import React, {useState,useEffect} from 'react';
import { Text, View , TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import {css} from '../../assets/css/Css';
import {styles} from '../../assets/css/Style'
import MenuHome from '../../assets/components/MenuHome';
import config from "../../config/config.json"

const renderImage = () => {
    const Images = [
      { image: 'https://img.freepik.com/fotos-gratis/tela-do-telefone-com-estetica-abstrata-de-marmore_53876-145553.jpg?w=996&t=st=1670868442~exp=1670869042~hmac=ffbb3051ac15dac9f63b91561801521b61c5a0bf8544bcb3f4001e713d5707f1' },
      { image: 'https://img.freepik.com/psd-gratuitas/maquete-de-smartphone_1310-920.jpg?w=996&t=st=1670868480~exp=1670869080~hmac=ecdd06da4a606fcccf2158779661805b4a9963524ea5122364587f48911662db' },
      { image: 'https://img.freepik.com/psd-gratuitas/mockup-de-smartphone_1310-558.jpg?1&w=996&t=st=1670868526~exp=1670869126~hmac=5395918e328a210c6f34823be7cc31cba683f4af46c1db6ebd1be315f518c91f' },
      { image: 'https://img.freepik.com/vetores-gratis/plano-de-design-novo-smartphone-em-diferentes-perspectivas_23-2148799052.jpg?w=996&t=st=1670868550~exp=1670869150~hmac=708f3796272b9e24b035d63dd2b96c2f8d080b0f7ad1b3964f4e9827ef5bcdff' },
      { image: 'https://img.freepik.com/psd-gratuitas/maquete-de-smartphone-brilhante_1310-814.jpg?w=996&t=st=1670868597~exp=1670869197~hmac=623880a0f3a0c9a0ee93a8dcbc1f9e752e885b3aa1d6ac33a10bdcfc4027dd4c'},
      { image: 'https://img.freepik.com/psd-gratuitas/maquete-de-smartphone_1310-873.jpg?w=996&t=st=1670868628~exp=1670869228~hmac=2c2198ff96faca3ea0c271fbc1f8f93f765b5baaf0b87551f38a513867dd59e6' },
      { image: 'https://img.freepik.com/psd-gratuitas/mockup-creativo-para-smartphones_1310-758.jpg?w=996&t=st=1670868704~exp=1670869304~hmac=9279cc104c58dae7d48fd86f177d84d5f875ddfa23a04ad286c555731b1fed7e' },
      { image: 'https://img.freepik.com/psd-gratuitas/mock-up-design-do-telefone-movel_1297-8.jpg?w=740&t=st=1670868739~exp=1670869339~hmac=3cbe1dbc96b1541ddb0192bd0dfb9e03e200d2d7f78766efe18c492331f33924' },
      { image: 'https://img.freepik.com/psd-gratuitas/maquete-de-dispositivo-movel-escuro_149660-801.jpg?w=900&t=st=1670868765~exp=1670869365~hmac=f5b8777f7d3aa79c253f2464b8363fb8bfdaf79d1b519cf7b9482759e17c4a6f' },
      { image: 'https://img.freepik.com/psd-gratuitas/mock-up-design-do-telefone-movel_1310-117.jpg?31&w=996&t=st=1670868802~exp=1670869402~hmac=48343b8d4e09ecc8269e695466ea92b11401258b859bdbf28e0084f8ee0fae64'},
      { image:'https://img.freepik.com/vetores-gratis/maquete-de-smartphone-realista-com-frente-e-verso_1017-19783.jpg?w=996&t=st=1670868850~exp=1670869450~hmac=97c7f7113e4f62a0c47ac903b01f436a1aaf0e2154157ac5f324b5b9e1164c3c'}
        
    
    
    
    ];
    const randomImageIndex = Math.floor(Math.random() * Math.floor(10));
    return Images[randomImageIndex].image;
};    
export default function Home({navigation}){   
    const [resultado, setResultado] = useState([]);

    const pegarDados = () => {
        axios.get(config.urlRoot)
            .then((resposta) => setResultado(resposta.data))
            };
    const Product = (dados) => {
       let valor = dados.preco.toFixed(2)
       valor = valor.replace(".",",")
        return(
            <TouchableOpacity
            onPress={()=>navigation.navigate('Modificar', { 
                id: dados.id,                  
                })}>
            <Card containerStyle ={{ backgroundColor: '#F0F0F0' }}>                  
            <Card.Image source={{ uri: renderImage() }} 
                style={{ padding: 0,height:180}}
                
            />
            <View style={{marginTop:10}}>
                <View>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={[styles.titulo,{fontWeight:"bold"}]}>Nome: </Text>
                        <Text style={styles.titulo}>{dados.nome}</Text>
                    </View>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <Text style={[styles.titulo,{fontWeight:"bold"}]}>Armazenamento: </Text>
                        <Text style={styles.titulo}>{dados.capacidade} gb</Text>
                    </View>
                   
                    <Text style={[styles.titulo,{fontWeight:'bold'}]}>Valor: R$ {valor}</Text>
                </View>
            </View> 
            </Card>
            </TouchableOpacity>
        )
    }   

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            console.log(focus)
            axios.get(config.urlRoot).then(() => {          
                pegarDados()
                console.log(resultado.map(product => console.log(product))); 
            }
    )});
        return focus;
    }, [navigation]);    
    return(
        <ScrollView>
        <View style={[css.container,{height:"100%",backgroundColor:'#F2F2F2'}]}>
            <MenuHome navigation={navigation} iconeleft="sign-out" iconeright="plus" title="Lista de Produtos"/>

            {resultado.map(product => (
            <Product key={product.id} {...product} />
               ))}  

          
         </View>
         </ScrollView> 
    )
}